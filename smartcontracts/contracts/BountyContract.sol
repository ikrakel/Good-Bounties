// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";
import {PGBountyState, IPGBountiesHandler} from "./interfaces/IPGBountiesHandler.sol";

contract BountyContract is ERC721URIStorage {
    error BountyDoesntExist();
    error BountyIsNotOpened();
    error BountyHasExpired();

    struct Bounty {
        uint256 tokenId;
        uint256 submissionDeadline;
        uint256 verificationPeriod;
        uint256 submittedTimestamp;
        address payable owner;
        address payable contributor;
        string attestationHash;
        PGBountyState state;
    }

    event BountyCreated(
        uint256 indexed tokenId,
        address owner,
        address contributor,
        string attestationHash,
        PGBountyState state
    );

    event ProofSubmitted(
        uint256 indexed tokenId,
        address indexed contributor,
        string attestationHash
    );

    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;

    address payable owner;

    mapping(uint256 => Bounty) private idToBounties;

    constructor() ERC721("Token", "NFT") {
        owner = payable(msg.sender);
    }

    function openBounty(
        uint256 submissionDeadline,
        uint256 verificationPeriod,
        string memory uri
    ) external payable returns (uint256) {
        //TODO: validate time fields

        tokenIds.increment();

        uint256 newTokenId = tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);

        createBounty(newTokenId, submissionDeadline, verificationPeriod);

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
        bounty.submittedTimestamp = block.timestamp;

        emit ProofSubmitted(_bountyId, msg.sender, _attestationHash);
    }

    function createBounty(
        uint256 tokenId,
        uint256 submissionDeadline,
        uint256 verificationPeriod // string calldata criteria, // string calldata description
    ) private {
        idToBounties[tokenId] = Bounty(
            tokenId,
            submissionDeadline,
            verificationPeriod,
            0,
            payable(msg.sender),
            payable(address(0)),
            "",
            PGBountyState.OPEN
        );
    }

    function fetchBounties() public view returns (Bounty[] memory) {
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
}
