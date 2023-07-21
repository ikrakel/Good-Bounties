import { ethers, network } from "hardhat";

import { deployGoalStakeContract } from "./shared";

async function main() {
  console.log(`Deploying Goal Stake Contract to ${network.name}`);

  const [creator] = await ethers.getSigners();

  console.log(`Owner will be ${creator.address}`);

  const goalStakeContract = await deployGoalStakeContract("0x33041027dd8F4dC82B6e825FB37ADf8f15d44053");

  console.log(`Goal Stake Contract: ${goalStakeContract.address}`);

  console.log("Done");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
