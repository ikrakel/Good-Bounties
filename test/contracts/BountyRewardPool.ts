import chai from "chai";
import { ethers, waffle } from "hardhat";
import { solidity } from "ethereum-waffle";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import type { BountyRewardPool } from "../../typechain-types";
import { Artifacts } from "../shared";

chai.use(solidity);

const { expect } = chai;
const { parseUnits } = ethers.utils;
const { deployContract, provider } = waffle;

describe("BountyRewardPool", () => {
  let creator: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  let bountyRewardContract: BountyRewardPool;

  beforeEach(async () => {
    [creator, addr1, addr2] = await ethers.getSigners();
  });

  it("can be deployed", async () => {
    // TODO: Add an actual ERC721 deploy here and replace the address below
    const action = deployContract(creator, Artifacts.BountyRewardPool, [
      "0x33041027dd8F4dC82B6e825FB37ADf8f15d44053",
    ]);

    await expect(action).not.to.be.reverted;
  });

  const builder = async () => {
    // TODO: Add an actual ERC721 deploy here and replace the address below
    return deployContract(creator, Artifacts.BountyRewardPool, [
      "0x33041027dd8F4dC82B6e825FB37ADf8f15d44053",
    ]) as Promise<BountyRewardPool>;
  };

  describe("functions", () => {
    beforeEach(async () => {
      bountyRewardContract = await builder();
    });

    it("allows for a user to contribute", async () => {
      await bountyRewardContract.connect(addr1).contribute({ value: parseUnits("1") });
      const balance = await provider.getBalance(bountyRewardContract.address);

      expect(balance).to.eq(parseUnits("1"));
    });

    it("allows for a user to claim rewards", async () => {
      await bountyRewardContract.connect(addr1).contribute({ value: parseUnits("1") });

      const balanceBefore = await provider.getBalance(addr2.address);
      await bountyRewardContract.connect(addr2).claimReward(0);
      const balanceAfter = await provider.getBalance(addr2.address);

      expect(balanceAfter).to.be.gt(balanceBefore);
    });
  });
});
