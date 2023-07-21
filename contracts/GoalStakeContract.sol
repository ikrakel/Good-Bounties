// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

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

contract GoalStakeContract is AccessControl {
  address public goalNFT;
  // We're mapping a tokenId to another mapping that links an address to its stake

  struct StakeStruct {
    mapping(address => uint) stakes;
    bool terminated;
  }

  mapping(uint => StakeStruct) public stakes;
  mapping(uint => uint) public totalStakesPerTokenId;

  constructor(address _goalNFT) {
    goalNFT = _goalNFT;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function stake(uint _tokenId) external payable {
    // TODO: Add the require below once we have a collection ready
    // require(ERC721(goalNFT).ownerOf(_tokenId) != address(0), "Goal does not exist");
    require(msg.value > 0, "Stake must be greater than 0");

    // Add the new stake to the mapping
    stakes[_tokenId].stakes[msg.sender] += msg.value;
    totalStakesPerTokenId[_tokenId] += msg.value;
  }

  function getStake(uint _tokenId, address _address) external view returns (uint) {
    if (stakes[_tokenId].terminated) return 0;

    return stakes[_tokenId].stakes[_address];
  }

  function withdraw(uint _tokenId) external {
    // TODO: Add the require below once we have a collection ready
    // require(ERC721(goalNFT).statusOf(_tokenId) == "complete", "Goal's state does not allow withdrawls");

    uint stakeAmount = stakes[_tokenId].stakes[msg.sender];
    require(stakeAmount > 0, "No funds to withdraw");
    require(stakes[_tokenId].terminated == false, "This goal already had its funds retrieved by an admin");

    // Reset the stake to 0
    stakes[_tokenId].stakes[msg.sender] = 0;
    totalStakesPerTokenId[_tokenId] -= stakeAmount;

    // Transfer the stake back to the user
    payable(msg.sender).transfer(stakeAmount);
  }

  function adminWithdraw(uint _tokenId) external onlyRole(DEFAULT_ADMIN_ROLE) {
    // Assume that the total stake for a token can be calculated
    uint totalStake = totalStakesPerTokenId[_tokenId];
    require(totalStake > 0, "No funds to retrieve");

    // Reset the stake mapping for the token
    totalStakesPerTokenId[_tokenId] = 0;
    stakes[_tokenId].terminated = true;

    // Transfer the stake back to the admin
    payable(msg.sender).transfer(totalStake);
  }
}

