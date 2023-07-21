import { ethers, network } from "hardhat";

import { deployBountyStakeContract } from "./shared";

async function main() {
  console.log(`Deploying Bounty Stake Contract to ${network.name}`);

  const [creator] = await ethers.getSigners();

  console.log(`Owner will be ${creator.address}`);

  // Replace address with those of the Bounty handler + Bounty Reward Pool
  const bountyStakeContract = await deployBountyStakeContract("0x33041027dd8F4dC82B6e825FB37ADf8f15d44053", "0x33041027dd8F4dC82B6e825FB37ADf8f15d44053");

  console.log(`Bounty Stake Contract: ${bountyStakeContract.address}`);

  console.log("Done");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
