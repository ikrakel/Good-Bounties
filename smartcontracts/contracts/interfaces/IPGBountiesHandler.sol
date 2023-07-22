// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {DelegatedAttestationRequest} from "../eas/EASCustom.sol";

enum PGBountyState {
    OPEN,
    SUBMITTED,
    VALIDATED,
    DISPUTED,
    CLAIMED,
    EXPIRED
}

struct Bounty {
    uint256 tokenId;
    uint256 submissionDeadline;
    uint256 verificationPeriod;
    uint256 submittedTime;
    uint256 claimedTime;
    address payable owner;
    address payable contributor;
    string attestationHash;
    PGBountyState state;
}

interface IPGBountiesHandler {
    event BountyCreated(
        uint256 indexed tokenId,
        address indexed owner,
        PGBountyState state,
        uint256 submissionDeadline,
        uint256 verificationPeriod
    );

    event ProofSubmitted(
        uint256 indexed tokenId,
        address indexed contributor,
        PGBountyState state,
        string attestationHash
    );

    event ProofValidated(
        uint256 indexed tokenId,
        address indexed contributor,
        PGBountyState state
    );

    event ProofDenied(
        uint256 indexed tokenId,
        address indexed contributor,
        PGBountyState state
    );

    event BountyClaimed(
        uint256 indexed tokenId,
        address indexed contributor,
        PGBountyState state
    );

    event BountyExpired(
        uint256 indexed tokenId,
        address indexed owner,
        PGBountyState state
    );

    /// @dev callable by anyone, msg.sender becomes bounty owner
    function openBounty(
        uint256 _submissionDeadline,
        uint256 _verificationPeriod,
        string memory _uri
    ) external payable returns (uint256);

    /// @dev callable by anyone, msg.sender becomes contributor
    function submitProof(
        uint256 _bountyId,
        string calldata _attestationHash
    ) external;

    /// @dev callable by bounty owner
    function validateProof(
        uint256 _bountyId
        // DelegatedAttestationRequest calldata _request
    ) external;

    /// @dev callable by bounty owner
    function denyProof(uint256 _bountyId) external;

    /// @dev callable by contributor
    function disputeBounty(uint256 _bountyId) external;

    /// @dev callable by staking contract
    function claimBounty(uint256 _bountyId) external;

    /// @dev callable by anyone
    function expireBounty(uint256 _bountyId) external;

    /// Read functions
    function fetchBounty(
        uint256 _tokenId
    ) external view returns (Bounty memory);

    function getState(uint256 _bountyId) external view returns (PGBountyState);
}
