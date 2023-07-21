import { ethers } from "hardhat";

import type {
  ERC20Mock,
  BountyStakeContract,
  BountyRewardPool
} from "../typechain-types";

export async function deployERC20Mock(name: string, symbol: string): Promise<ERC20Mock> {
  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");

  const erc20 = await ERC20Mock.deploy(name, symbol);
  await erc20.deployed();

  return erc20 as ERC20Mock;
}

export async function deployBountyStakeContract(bountyManagerAddress: string, bountyRewardPoolAddress: string): Promise<BountyStakeContract> {
  const BountyStakeContract = await ethers.getContractFactory("BountyStakeContract");

  const bountyStakeContract = await BountyStakeContract.deploy(bountyManagerAddress, bountyRewardPoolAddress);
  await bountyStakeContract.deployed();

  return bountyStakeContract as BountyStakeContract;
}

export async function deployBountyRewardPool(): Promise<BountyRewardPool> {
  const BountyRewardPool = await ethers.getContractFactory("BountyRewardPool");

  const bountyRewardContract = await BountyRewardPool.deploy();
  await bountyRewardContract.deployed();

  return bountyRewardContract as BountyRewardPool;
}
