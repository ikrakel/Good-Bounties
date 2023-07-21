import { ethers, network } from "hardhat";

import { deployBountyRewardPool } from "./shared";

async function main() {
  console.log(`Deploying Bounty Reward Contract to ${network.name}`);

  const [creator] = await ethers.getSigners();

  console.log(`Owner will be ${creator.address}`);

  // Replace address with those of the Bounty handler + Bounty Reward Pool
  const bountyRewardContract = await deployBountyRewardPool();

  console.log(`Bounty Reward Contract: ${bountyRewardContract.address}`);

  console.log("Done");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
