import { ethers, network } from "hardhat";

import { deployBountyStakeContract, deployPGBountiesManager } from "./shared";

async function main() {
  console.log(`Deploying Bounty Stake Contract to ${network.name}`);

  const [creator] = await ethers.getSigners();

  console.log(`Owner will be ${creator.address}`);

  const pgBountiesContract = await deployPGBountiesManager();
  console.log(`PG Bounties Manager Contract: ${pgBountiesContract.address}`);

  // Replace address with those of the Bounty handler + Bounty Reward Pool
  const bountyStakeContract = await deployBountyStakeContract(
    pgBountiesContract.address
  );

  console.log(`Bounty Stake Contract: ${bountyStakeContract.address}`);

  pgBountiesContract.setStakingContractAddress(bountyStakeContract.address);

  console.log("Done");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
