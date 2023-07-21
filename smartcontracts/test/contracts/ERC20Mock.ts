import chai from "chai";
import { ethers, waffle } from "hardhat";
import { solidity } from "ethereum-waffle";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import type { ERC20Mock } from "../../typechain-types";
import { Artifacts } from "../shared";

chai.use(solidity);

const { expect } = chai;
const { parseUnits } = ethers.utils;
const { deployContract } = waffle;

describe("ERC20Mock", () => {
  let creator: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  let erc20Mock: ERC20Mock;

  beforeEach(async () => {
    [creator, addr1, addr2] = await ethers.getSigners();
  });

  it("can be deployed", async () => {
    const action = deployContract(creator, Artifacts.ERC20Mock, [
      "MOCK TOKEN",
      "MOCK"
    ]);

    await expect(action).not.to.be.reverted;
  });

  const builder = async () => {
    return deployContract(creator, Artifacts.ERC20Mock, [
      "MOCK TOKEN",
      "MOCK"
    ]) as Promise<ERC20Mock>;
  };

  describe("functions", () => {
    beforeEach(async () => {
      erc20Mock = await builder();
    });

    it("has the given name and symbol", async () => {
      expect(await erc20Mock.name()).to.eq("MOCK TOKEN");
      expect(await erc20Mock.symbol()).to.eq("MOCK");
    });

    it("starts with a total supply of 1000000 ethers", async () => {
      expect(await erc20Mock.totalSupply()).to.eq(parseUnits("1000000"));
    });
  });
});
