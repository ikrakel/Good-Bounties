// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

enum PGBountyState {
    OPEN,
    SUBMITTED,
    VALIDATED,
    DISPUTED,
    CLAIMED,
    EXPIRED
}

interface IPGBountiesHandler {
    function openBounty() external payable returns (uint256); // anyone (bounty owner)

    function submitProof(
        uint256 _bountyId,
        string calldata _attestationHash
    ) external; // anyone (contributor)

    function validateProof(uint256 _bountyId) external; // onlyBountyOwner

    function denyProof(uint256 _bountyId) external; // onlyBountyOwner

    function disputeBounty(uint256 _bountyId) external; // onlyBountyContributor

    function claimBounty(uint256 _bountyId) external; // onlyStakingContract

    function expireBounty(uint256 _bountyId) external; // anyone
}
