import { ethers } from "hardhat";

import type {
  ERC20Mock,
  BountyStakeContract
} from "../typechain-types";

export async function deployERC20Mock(name: string, symbol: string): Promise<ERC20Mock> {
  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");

  const erc20 = await ERC20Mock.deploy(name, symbol);
  await erc20.deployed();

  return erc20 as ERC20Mock;
}

export async function deployBountyStakeContract(address: string): Promise<BountyStakeContract> {
  const BountyStakeContract = await ethers.getContractFactory("ERC20Mock");

  const bountyStakeContract = await BountyStakeContract.deploy(address);
  await bountyStakeContract.deployed();

  return bountyStakeContract as BountyStakeContract;
}
