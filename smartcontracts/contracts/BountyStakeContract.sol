// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

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
  function getStake(uint _tokenId, address _address) external view returns (uint);

  // stakes a given amount in a given bounty (tokenId)
  function stake(uint _tokenId) external payable;

  // withdraws the stake from a given bounty (tokenId)
  function withdraw(uint _tokenId) external;
}

contract BountyStakeContract is IBountyStakeContract {
  address public bountyNFT;

  // Event declarations
  event StakeMade(uint indexed tokenId, address indexed staker, uint amount);
  event StakeWithdrawn(uint indexed tokenId, address indexed staker, uint amount);

  // We're mapping a tokenId to another mapping that links an address to its stake
  mapping(uint => mapping(address => uint)) public stakes;
  mapping(uint => uint) public totalStakesPerTokenId;

  constructor(address _bountyNFT) {
    bountyNFT = _bountyNFT;
  }

  function getStake(uint _tokenId, address _address) external view  override(IBountyStakeContract) returns (uint) {
    return stakes[_tokenId][_address];
  }

  function stake(uint _tokenId) external payable override(IBountyStakeContract) {
    // TODO: Add the require below once we have a collection ready
    // require(ERC721(bountyNFT).ownerOf(_tokenId) != address(0), "Bounty does not exist");
    require(msg.value > 0, "Stake must be greater than 0");

    // Add the new stake to the mapping
    stakes[_tokenId][msg.sender] += msg.value;
    totalStakesPerTokenId[_tokenId] += msg.value;

    emit StakeMade(_tokenId, msg.sender, msg.value);
  }

  function withdraw(uint _tokenId) external override(IBountyStakeContract) {
    // TODO: Add the require below once we have a collection ready
    // require(ERC721(bountyNFT).statusOf(_tokenId) == "complete", "Bounty's state does not allow withdrawls");

    // TODO: Depending on the state of bounty it should be withdrawn for the staker or for the contributor
    // _withdrawForContributors(_tokenId, msg.sender);
    _withdrawForStakers(_tokenId, msg.sender);

    emit StakeWithdrawn(_tokenId, msg.sender, stakeAmount);
  }

  function _withdrawForContributors(uint _tokenId, address _claimer) internal {
    // TODO: Add a lookup if the user has contributed to the bounty

    uint availableForBounty = totalStakesPerTokenId[_tokenId];
    totalStakesPerTokenId[_tokenId] = 0;

    payable(_claimer).transfer(availableForBounty);
  }

  function _withdrawForStakers(uint _tokenId, address _claimer) internal {
    uint stakeAmount = stakes[_tokenId][msg.sender];
    require(stakeAmount > 0, "No funds to withdraw");

    // Reset the stake to 0
    stakes[_tokenId][_claimer] = 0;
    totalStakesPerTokenId[_tokenId] -= stakeAmount;

    // Transfer the stake back to the user
    payable(_claimer).transfer(stakeAmount);
  }
}
