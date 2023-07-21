// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/*
* The GoalStakeContract is designed to facilitate staking on NFT goals. Each NFT
* represents a unique goal created by users. Multiple users can stake Ether on these
* goals. Stakes are tied to both the goal (identified by its token ID) and the address
* of the user who stakes.
*
* Users can stake multiple times on the same goal, and their total stake is tracked.
* When the goal is completed, users can withdraw their stakes.
*
* Note: Interactions with the GoalNFT contract (e.g., checking goal ownership and status)
* are stubbed out and should be completed according to the specific ERC721 contract implementation.
*/

contract GoalStakeContract {
  address public goalNFT;
  // We're mapping a tokenId to another mapping that links an address to its stake
  mapping(uint => mapping(address => uint)) public stakes;

  constructor(address _goalNFT) {
    goalNFT = _goalNFT;
  }

  function stake(uint _tokenId) external payable {
    // TODO: Add the require below once we have a collection ready
    // require(ERC721(goalNFT).ownerOf(_tokenId) != address(0), "Goal does not exist");
    require(msg.value > 0, "Stake must be greater than 0");

    // Add the new stake to the mapping
    stakes[_tokenId][msg.sender] += msg.value;
  }

  function withdraw(uint _tokenId) external {
    // TODO: Add the require below once we have a collection ready
    // require(ERC721(goalNFT).statusOf(_tokenId) == "complete", "Goal does not exist");

    uint stakeAmount = stakes[_tokenId][msg.sender];
    require(stakeAmount > 0, "No funds to withdraw");

    // Reset the stake to 0
    stakes[_tokenId][msg.sender] = 0;

    // Transfer the stake back to the user
    payable(msg.sender).transfer(stakeAmount);
  }
}

