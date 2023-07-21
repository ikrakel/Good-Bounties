import chai from "chai";
import { ethers, waffle } from "hardhat";
import { solidity } from "ethereum-waffle";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import type { BountyStakeContract, BountyRewardPool } from "../../typechain-types";
import { Artifacts } from "../shared";

chai.use(solidity);

const { expect } = chai;
const { parseUnits } = ethers.utils;
const { deployContract, provider } = waffle;

describe("BountyStakeContract", () => {
  let creator: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  let bountyStakeContract: BountyStakeContract;
  let bountyRewardContract: BountyRewardPool;

  beforeEach(async () => {
    [creator, addr1, addr2] = await ethers.getSigners();
  });

  it("can be deployed", async () => {
    // TODO: Add an actual ERC721 deploy here and replace the address below
    bountyRewardContract = await deployContract(creator, Artifacts.BountyRewardPool, ["0x33041027dd8F4dC82B6e825FB37ADf8f15d44053"]);
    const action = deployContract(creator, Artifacts.BountyStakeContract, [
      "0x33041027dd8F4dC82B6e825FB37ADf8f15d44053",
      bountyRewardContract.address
    ]);

    await expect(action).not.to.be.reverted;
  });

  const builder = async () => {
    // TODO: Add an actual ERC721 deploy here and replace the address below
    return deployContract(creator, Artifacts.BountyStakeContract, [
      "0x33041027dd8F4dC82B6e825FB37ADf8f15d44053",
      bountyRewardContract.address
    ]) as Promise<BountyStakeContract>;
  };

  const getBalanceOfStake = async (tokenId: number, address: string) => {
    return await bountyStakeContract.getStake(tokenId, address);
  }

  describe("functions", () => {
    beforeEach(async () => {
      bountyRewardContract = await deployContract(creator, Artifacts.BountyRewardPool, ["0x33041027dd8F4dC82B6e825FB37ADf8f15d44053"]);
      bountyStakeContract = await builder();
    });

    it("allows for a user to stake", async () => {
      const tokenID = 1;
      await bountyStakeContract.connect(addr1).stake(tokenID, { value: parseUnits("1") });

      expect(await getBalanceOfStake(tokenID, addr1.address)).to.eq(parseUnits("1"));
    });

    it("allows for more than 1 user to stake", async () => {
      const tokenID = 1;
      await bountyStakeContract.connect(addr1).stake(tokenID, { value: parseUnits("1") });
      await bountyStakeContract.connect(addr2).stake(tokenID, { value: parseUnits("2") });

      expect(await getBalanceOfStake(tokenID, addr1.address)).to.eq(parseUnits("1"));
      expect(await getBalanceOfStake(tokenID, addr2.address)).to.eq(parseUnits("2"));
    });

    it("allows the users to withdraw their stake", async () => {
      const tokenID = 1;
      await bountyStakeContract.connect(addr1).stake(tokenID, { value: parseUnits("1") });
      expect(await getBalanceOfStake(tokenID, addr1.address)).to.eq(parseUnits("1"));

      await bountyStakeContract.connect(addr1).withdraw(tokenID);
      expect(await getBalanceOfStake(tokenID, addr1.address)).to.eq(parseUnits("0"));
    });

    it("does not allow anyone but the user to withdraw the stake", async () => {
      const tokenID = 1;
      await bountyStakeContract.connect(addr1).stake(tokenID, { value: parseUnits("1") });
      expect(await getBalanceOfStake(tokenID, addr1.address)).to.eq(parseUnits("1"));

      expect(bountyStakeContract.connect(addr2).withdraw(tokenID)).to.be.revertedWith('No funds to withdraw');
    });
  });
});
