// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

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

contract BountyStakeContract is AccessControl {
  address public bountyNFT;
  // We're mapping a tokenId to another mapping that links an address to its stake

  struct StakeStruct {
    mapping(address => uint) stakes;
    bool terminated;
  }

  mapping(uint => StakeStruct) public stakes;
  mapping(uint => uint) public totalStakesPerTokenId;

  constructor(address _bountyNFT) {
    bountyNFT = _bountyNFT;
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function getStake(uint _tokenId, address _address) external view returns (uint) {
    if (stakes[_tokenId].terminated) return 0;

    return stakes[_tokenId].stakes[_address];
  }

  function stake(uint _tokenId) external payable {
    // TODO: Add the require below once we have a collection ready
    // require(ERC721(bountyNFT).ownerOf(_tokenId) != address(0), "Bounty does not exist");
    require(msg.value > 0, "Stake must be greater than 0");

    // Add the new stake to the mapping
    stakes[_tokenId].stakes[msg.sender] += msg.value;
    totalStakesPerTokenId[_tokenId] += msg.value;
  }

  function withdraw(uint _tokenId) external {
    // TODO: Add the require below once we have a collection ready
    // require(ERC721(bountyNFT).statusOf(_tokenId) == "complete", "Bounty's state does not allow withdrawls");

    uint stakeAmount = stakes[_tokenId].stakes[msg.sender];
    require(stakeAmount > 0, "No funds to withdraw");
    require(stakes[_tokenId].terminated == false, "This bounty already had its funds retrieved by an admin");

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

