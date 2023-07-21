import { ethers } from "hardhat";

import type {
  ERC20Mock
} from "../typechain-types";

export async function deployERC20Mock(name: string, symbol: string): Promise<ERC20Mock> {
  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");

  const erc20 = await ERC20Mock.deploy(name, symbol);
  await erc20.deployed();

  return erc20 as ERC20Mock;
}