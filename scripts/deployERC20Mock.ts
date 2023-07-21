import { ethers, network } from "hardhat";

import { deployERC20Mock } from "./shared";

async function main() {
  console.log(`Deploying ERC20 mock to ${network.name}`);

  const [creator] = await ethers.getSigners();

  console.log(`Owner will be ${creator.address}`);

  const levelOne = await deployERC20Mock("MOCK TOKEN", "MOCK");

  console.log(`ERC20 Mock: ${levelOne.address}`);

  console.log("Done");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
