// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/*
* The BountyRewardPool contract is a pool of funds intended to reward users who have
* completed their bounties. Users (or any other participants) can contribute to the pool.
* When a bounty (represented by an NFT) is completed, the user who owns the bounty can claim
* a reward from the pool.
*
* Note: Interactions with the BountyNFT contract (e.g., checking bounty ownership and status)
* are stubbed out and should be completed according to the specific ERC721 contract implementation.
*/

interface IBountyRewardPool {
  // contributes to the Pool
  function contribute() external payable;

  // Retrieves rewards accumulated in the pool for a given bounty (tokenId)
  function claimReward(uint _tokenId) external;
}

contract BountyRewardPool is IBountyRewardPool {
  address public bountyNFT;

  uint public totalPool;

  constructor(address _bountyNFT) {
    bountyNFT = _bountyNFT;
  }

  // Anyone can contribute to the pool
  function contribute() external payable override(IBountyRewardPool) {
    totalPool += msg.value;
  }

  // Users who have completed their bounties can claim a reward
  function claimReward(uint _tokenId) external override(IBountyRewardPool) {
    // TODO: Check if the bounty is completed
    // require(ERC721(bountyNFT).statusOf(_tokenId) == "completed", "Bounty is not completed");

    // TODO: Check if the sender is the owner of the bounty
    // require(ERC721(bountyNFT).ownerOf(_tokenId) == msg.sender, "Only the bounty owner can claim a reward");

    uint rewardAmount = calculateReward(_tokenId);

    require(rewardAmount > 0, "No reward to claim");
    require(totalPool >= rewardAmount, "Insufficient funds in the pool");

    totalPool -= rewardAmount;

    payable(msg.sender).transfer(rewardAmount);
  }

  // calculate the amount that can be retrieved from the pool.
  function calculateReward(uint _tokenId) internal view returns (uint) {
    // TODO: Add a more interesting logic, for now simply allow to claim the full balance

    return totalPool;
  }
}
