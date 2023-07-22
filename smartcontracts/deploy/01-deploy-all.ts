import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = getNamedAccounts();
  // const chainId = network.config.chainId;PGBountiesManagerPGBountiesManager

  const pgBountiesManager = await deploy("PGBountiesManager", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });

  // const stakingContract = await deploy("BountyStakeContract", {
  //   from: deployer,
  //   args: [pgBountiesManager.address],
  //   log: true,
  //   waitConfirmations: 1,
  // });

  // await pgBountiesManager.setStakingContractAddress(stakingContract.address);
};

module.exports.tags = ["all", "pgbounties", "stakingcontract"];
