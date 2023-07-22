// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

enum PGBountyState {
    OPEN,
    SUBMITTED,
    DISPUTED,
    CLAIMED,
    EXPIRED
}
interface IPGBountiesHandler {
    function openBounty() external returns (uint256); // anyone (bounty owner)
    function submitProof(uint256 bountyId, bytes32 proof) external; // anyone (contributor)
    function validateProof(uint256 bountyId) external; // onlyBountyOwner
    function denyProof(uint256 bountyId) external; // onlyBountyOwner
    function disputeBounty(uint256 bountyId) external; // onlyBountySubmitter
    function claimBounty(uint256 bountyId) external; // onlyStakingContract
    function expireBounty(uint256 bountyId) external; // anyone
}