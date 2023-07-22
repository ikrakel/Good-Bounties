// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";
import {PGBountyState, Bounty, IPGBountiesHandler} from "./interfaces/IPGBountiesHandler.sol";
import {DelegatedAttestationRequest, EASCustom} from "./eas/EASCustom.sol";

contract PGBountiesManager is ERC721URIStorage, IPGBountiesHandler {
    error BountyDeadlineBeforeNow();
    error BountyDoesntExist();
    error BountyIsNotOpened();
    error BountyIsNotSubmitted();
    error BountyIsNotVerified();
    error BountyHasExpired();
    error VerificationPeriodExpired();
    error OnlyOwnerCanValidateAttestation();
    error BountyIsNotClaimable();
    error StakingContractIsZero();
    error OnlyOwnerIsAuthorized();
    error OnlyStakingContractIsAuthorized();
    error BountyHasntExpiredYet();

    using Counters for Counters.Counter;

    Counters.Counter private tokenIds;
    address payable owner;
    address stakingContract;
    EASCustom eas;
    mapping(uint256 => Bounty) private idToBounties;

    constructor() ERC721("Token", "NFT") {
        owner = payable(msg.sender);
        eas = new EASCustom();
    }

    function openBounty(
        uint256 _submissionDeadline,
        uint256 _verificationPeriod,
        string memory _uri
    ) external payable returns (uint256) {
        if (_submissionDeadline < block.timestamp)
            revert BountyDeadlineBeforeNow();

        tokenIds.increment();

        uint256 newTokenId = tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _uri);

        createBounty(newTokenId, _submissionDeadline, _verificationPeriod);

        return newTokenId;
    }

    function submitProof(
        uint256 _bountyId,
        string calldata _attestationHash
    ) external {
        Bounty storage bounty = idToBounties[_bountyId];
        if (bounty.owner == address(0)) revert BountyDoesntExist();
        if (bounty.state != PGBountyState.OPEN) revert BountyIsNotOpened();
        if (block.timestamp > bounty.submissionDeadline)
            revert BountyHasExpired();

        bounty.attestationHash = _attestationHash;
        bounty.state = PGBountyState.SUBMITTED;
        bounty.contributor = payable(msg.sender);
        bounty.submittedTime = block.timestamp;

        emit ProofSubmitted(
            _bountyId,
            msg.sender,
            PGBountyState.SUBMITTED,
            _attestationHash
        );
    }

    function validateProof(
        uint256 _bountyId
    ) external // DelegatedAttestationRequest calldata _request
    {
        _checksBeforeValidation(_bountyId);
        // eas.verifyAttest(_request);

        Bounty storage bounty = idToBounties[_bountyId];
        bounty.state = PGBountyState.VALIDATED;

        emit ProofValidated(
            _bountyId,
            bounty.contributor,
            PGBountyState.VALIDATED
        );
    }

    function denyProof(uint256 _bountyId) external {
        _checksBeforeValidation(_bountyId);

        Bounty storage bounty = idToBounties[_bountyId];
        if (block.timestamp >= bounty.submissionDeadline) {
            bounty.state = PGBountyState.EXPIRED;
        } else {
            bounty.state = PGBountyState.OPEN;
        }

        emit ProofDenied(_bountyId, bounty.contributor, bounty.state);
    }

    function _checksBeforeValidation(uint256 _bountyId) internal view {
        Bounty memory bounty = idToBounties[_bountyId];
        if (bounty.owner == address(0)) revert BountyDoesntExist();
        if (bounty.owner != msg.sender)
            revert OnlyOwnerCanValidateAttestation();
        if (bounty.state != PGBountyState.SUBMITTED)
            revert BountyIsNotSubmitted();
        if (block.timestamp > bounty.submittedTime + bounty.verificationPeriod)
            revert VerificationPeriodExpired();
    }

    function createBounty(
        uint256 tokenId,
        uint256 submissionDeadline,
        uint256 verificationPeriod
    ) private {
        idToBounties[tokenId] = Bounty(
            tokenId,
            submissionDeadline,
            verificationPeriod,
            0,
            0,
            payable(msg.sender),
            payable(address(0)),
            "",
            PGBountyState.OPEN
        );

        emit BountyCreated(
            tokenId,
            owner,
            PGBountyState.OPEN,
            submissionDeadline,
            verificationPeriod
        );
    }

    function fetchBounties() external view returns (Bounty[] memory) {
        uint256 itemCount = tokenIds.current();
        uint256 currentIndex = 0;

        Bounty[] memory items;

        for (uint256 i = 0; i < itemCount; i++) {
            if (idToBounties[i + 1].state == PGBountyState.OPEN) {
                uint256 currentId = i + 1;

                Bounty storage currentItem = idToBounties[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    function fetchBounty(
        uint256 _tokenId
    ) external view returns (Bounty memory) {
        return idToBounties[_tokenId];
    }

    function getState(uint256 _bountyId) external view returns (PGBountyState) {
        Bounty memory bounty = idToBounties[_bountyId];
        if (bounty.owner == address(0)) revert BountyDoesntExist();
        return bounty.state;
    }

    function setStakingContractAddress(address _stakingContract) external {
        //onlyOwner
        if (_stakingContract == address(0)) revert StakingContractIsZero();
        if (msg.sender != owner) revert OnlyOwnerIsAuthorized();
        stakingContract = _stakingContract;
    }

    function claimBounty(uint256 _bountyId) external {
        // only callable by staking contract
        Bounty storage bounty = idToBounties[_bountyId];

        if (bounty.owner == address(0)) revert BountyDoesntExist();
        if (msg.sender != stakingContract)
            revert OnlyStakingContractIsAuthorized();
        if (
            bounty.state == PGBountyState.VALIDATED ||
            (bounty.state == PGBountyState.SUBMITTED &&
                block.timestamp >
                bounty.submittedTime + bounty.verificationPeriod)
        ) {
            bounty.state = PGBountyState.CLAIMED;
            bounty.claimedTime = block.timestamp;
        } else {
            revert BountyIsNotClaimable();
        }

        emit BountyClaimed(
            _bountyId,
            bounty.contributor,
            PGBountyState.CLAIMED
        );
    }

    function expireBounty(uint256 _bountyId) external {
        Bounty storage bounty = idToBounties[_bountyId];

        if (bounty.owner == address(0)) revert BountyDoesntExist();
        if (block.timestamp <= bounty.submissionDeadline)
            revert BountyHasntExpiredYet();

        bounty.state = PGBountyState.EXPIRED;
        emit BountyExpired(_bountyId, owner, PGBountyState.EXPIRED);
    }

    function disputeBounty(uint256 _bountyId) external {}
}
