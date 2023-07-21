// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import 'hardhat/console.sol';
import { PGBountyState } from './interfaces/IPGBountiesHandler.sol';

contract BountyContract is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  address payable owner;

  mapping(uint256 => Bounty) private idBounty;

  struct Bounty {
    uint256 tokenId;
    address payable owner;
    address payable contributor;
    uint256 reward;
    string criteria;
    string description;
    PGBountyState state;
  }

  event idBountyCreated(
    uint256 indexed tokenId,
    address owner,
    address contributor,
    uint256 reward,
    string criteria,
    string description,
    PGBountyState state
  );

  constructor() ERC721('Token', 'NFT') {
    owner = payable(msg.sender);
  }

  function createToken(
    uint256 reward,
    string calldata criteria,
    string calldata description
  ) public payable returns (uint256) {
    require(reward > 0, 'The reward must be bigger than 0.');

    _tokenIds.increment();

    uint256 newTokenId = _tokenIds.current();

    _mint(msg.sender, newTokenId);

    createBounty(newTokenId, reward, criteria, description);

    return newTokenId;
  }

  function createBounty(
    uint256 tokenId,
    uint256 reward,
    string calldata criteria,
    string calldata description
  ) private {
    idBounty[tokenId] = Bounty(
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      reward,
      criteria,
      description,
      PGBountyState.OPEN
    );

    _transfer(msg.sender, address(this), tokenId);

    emit idBountyCreated(
      tokenId,
      msg.sender,
      address(0),
      reward,
      criteria,
      description,
      PGBountyState.OPEN
    );
  }
}
