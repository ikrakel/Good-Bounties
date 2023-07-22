import { ethers, network } from "hardhat";
import dayjs from "dayjs";
import * as BountyContract from "../artifacts/contracts/PGBountiesManager.sol/PGBountiesManager.json";

const ALL_BOUNTIES = [
  {
    submissionDeadline: "2023-12-05",
    verificationPeriod: "24",
    uri: "ipfs://bafyreib23qbj4qde3a5cy6uo5lxufhmvd67g2cijnlerjm3qknm62v74om/metadata.json"
  },
  {
    submissionDeadline: "2023-08-05",
    verificationPeriod: "24",
    uri: "ipfs://bafyreifoaxtfn7uj5v52ex5g55gvgzgpvnll3y5mwmurjd23j2ewk3yywu/metadata.json"
  },
  {
    submissionDeadline: "2023-09-20",
    verificationPeriod: "24",
    uri: "ipfs://bafyreia4rdcomn35emo6u5wdq4ht5yaoh6x5ot5sao4i7jhmkzenqjfw7u/metadata.json"
  },
  {
    submissionDeadline: "2023-11-30",
    verificationPeriod: "24",
    uri: "ipfs://bafyreignmnoewbfifx7f3fl54lssq3zgaot7yvvcwoicq4d2upxrhnbjr4/metadata.json"
  },
  {
    submissionDeadline: "2023-08-30",
    verificationPeriod: "24",
    uri: "ipfs://bafyreibcrm6gmilidhucb53b7avr5eufycyzinscoata22beiu5lmyalwa/metadata.json"
  },
  {
    submissionDeadline: "2023-07-20",
    verificationPeriod: "24",
    uri: "ipfs://bafyreia33fx53vrvh4sa7gotg2kuoqlozrqtb5a7u3czpoxojp3t5cvc6a/metadata.json"
  },
  {
    submissionDeadline: "2023-11-15",
    verificationPeriod: "24",
    uri: "ipfs://bafyreiffaoi4peh3lhtk6kawfi3z2ox3laog5fopnxmi4sbwelt7gdxf5m/metadata.json"
  },
  {
    submissionDeadline: "2023-08-31",
    verificationPeriod: "24",
    uri: "ipfs://bafyreieljs6vifumbrpgrtclxwtxicp62yx5vulm6b6zgo7ugrp6qnl5ly/metadata.json"
  },
  {
    submissionDeadline: "2023-08-15",
    verificationPeriod: "24",
    uri: "ipfs://bafyreifiitlsi5c2v43qdky4ghqiou4yj6v223fjq63diogqlvsjy266xi/metadata.json"
  },
  {
    submissionDeadline: "2023-10-10",
    verificationPeriod: "24",
    uri: "ipfs://bafyreicfkjdksonuoycwqyls4corjpuudkmnewvv3r7uf45mml7n33vgma/metadata.json"
  }
]

async function main() {
  console.log(`Deploying Bounty Contract to ${network.name}`);

  const [creator] = await ethers.getSigners();
  const provider =  new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");

  console.log(`Creator is ${creator.address}`);

  const pgBountiesManager = new ethers.Contract(
    "0x87aD9FbE6c054fe330c996d101716De439eaaB9c",
    BountyContract.abi,
    provider
  );

  console.log(`Bounty Contract: ${pgBountiesManager.address}`);
  const start = dayjs().unix();
  const end = dayjs().add(1, "day").unix();
  const period = end - start;

  for (let i = 0; i < ALL_BOUNTIES.length; i++) {
    const bounty = ALL_BOUNTIES[i];

    const deadline = dayjs(bounty.submissionDeadline).unix();
    const tx = await pgBountiesManager.connect(creator).openBounty(deadline, period, bounty.uri);
    console.log(`Bounty #${i} created: ${tx.hash}`);
    await tx.wait();
    console.log("finished running");
  }

  console.log("Done");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
