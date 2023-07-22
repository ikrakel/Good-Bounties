// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {PGBountyState, BountyContract} from "./BountyContract.sol";

/*
 * The BountyStakeContract is designed to facilitate staking on NFT Bounties. Each NFT
 * represents a unique bounty created by users. Multiple users can stake Ether on these
 * bounties. Stakes are tied to both the bounty (identified by its token ID) and the address
 * of the user who stakes.
 *
 * Users can stake multiple times on the same bounty, and their total stake is tracked.
 * When the bounty is completed, users can withdraw their stakes.
 *
 * Note: Interactions with the BountyNFT contract (e.g., checking bounty ownership and status)
 * are stubbed out and should be completed according to the specific ERC721 contract implementation.
 */

interface IBountyStakeContract {
    // returns the staked amount in a given bounty by a given address
    function getStake(
        uint256 _tokenId,
        address _address
    ) external view returns (uint256);

    // stakes a given amount in a given bounty (tokenId)
    function stake(uint256 _tokenId) external payable;

    // withdraws the stake from a given bounty (tokenId)
    function withdraw(uint256 _tokenId) external;
}

contract BountyStakeContract is IBountyStakeContract {
    address public bountyNFT;

    // Event declarations
    event StakeMade(
        uint256 indexed tokenId,
        address indexed staker,
        uint256 amount
    );
    event StakeWithdrawn(
        uint256 indexed tokenId,
        address indexed staker,
        uint256 amount
    );

    // We're mapping a tokenId to another mapping that links an address to its stake
    mapping(uint256 => mapping(address => uint256)) public stakes;
    mapping(uint256 => uint256) public totalStakesPerTokenId;

    constructor(address _bountyNFT) {
        bountyNFT = _bountyNFT;
    }

    function getStake(
        uint256 _tokenId,
        address _address
    ) external view override(IBountyStakeContract) returns (uint256) {
        return stakes[_tokenId][_address];
    }

    function stake(
        uint256 _tokenId
    ) external payable override(IBountyStakeContract) {
        require(BountyContract(bountyNFT).ownerOf(_tokenId) != address(0), "Bounty does not exist");
        require(msg.value > 0, "Stake must be greater than 0");

        // Add the new stake to the mapping
        stakes[_tokenId][msg.sender] += msg.value;
        totalStakesPerTokenId[_tokenId] += msg.value;

        emit StakeMade(_tokenId, msg.sender, msg.value);
    }

    function withdraw(
        uint256 _tokenId
    ) external override(IBountyStakeContract) {
        require(BountyContract(bountyNFT).ownerOf(_tokenId) != address(0), "Bounty does not exist");
        BountyContract.Bounty memory bounty = BountyContract(bountyNFT).fetchBounty(_tokenId);

        require(bounty.state == PGBountyState.VALIDATED || bounty.state == PGBountyState.EXPIRED, "Bounty's state does not allow withdrawls");

        if(bounty.state == PGBountyState.VALIDATED) {
            _withdrawForContributors(_tokenId, msg.sender, bounty);
        }

        if(bounty.state == PGBountyState.EXPIRED) {
            _withdrawForStakers(_tokenId, msg.sender);
        }
    }

    function _withdrawForContributors(
        uint256 _tokenId,
        address _claimer,
        BountyContract.Bounty memory bounty
    ) internal {
        require(bounty.contributor == _claimer, "Only the contributor can withdraw");
        require(totalStakesPerTokenId[_tokenId] > 0, "No funds to withdraw");

        uint256 availableForBounty = totalStakesPerTokenId[_tokenId];
        totalStakesPerTokenId[_tokenId] = 0;

        BountyContract(bountyNFT).claimBounty(_tokenId);
        payable(_claimer).transfer(availableForBounty);
    }

    function _withdrawForStakers(uint256 _tokenId, address _claimer) internal {
        uint256 stakeAmount = stakes[_tokenId][_claimer];
        require(stakeAmount > 0, "No funds to withdraw");

        // Reset the stake to 0
        stakes[_tokenId][_claimer] = 0;
        totalStakesPerTokenId[_tokenId] -= stakeAmount;

        // Transfer the stake back to the user
        emit StakeWithdrawn(_tokenId, msg.sender, stakeAmount);
        payable(_claimer).transfer(stakeAmount);
    }
}
