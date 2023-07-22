import { ethers, network } from "hardhat";
import dayjs from "dayjs";
import * as BountyContract from "../artifacts/contracts/PGBountiesManager.sol/PGBountiesManager.json";

// Metadata (#0 - Beach Clean-up) URI:  ipfs://bafyreibo2hgtka66poydoa6z53lhfzub4ieeixyf7iyqogux2u242srj4q/metadata.json
// Metadata (#1 - Donate Books to a Local Library) URI:  ipfs://bafyreiec6im33lakrwviiqv22zo77vckrm5i4j3a2i5fdgt2yflsw7uy34/metadata.json
// Metadata (#2 - Donate Blood, Save Lives) URI:  ipfs://bafyreifco4hbickumqmpilscekecwh7cad6n4wdav7p7lqd2ej3io2rch4/metadata.json
// Metadata (#3 - Park Clean-Up) URI:  ipfs://bafyreignmnoewbfifx7f3fl54lssq3zgaot7yvvcwoicq4d2upxrhnbjr4/metadata.json
// Metadata (#4 - Adopt a Pet, Change a Life) URI:  ipfs://bafyreih4y24ydlfw5adeopzomvneh55v5lranxqw7ukmynspm6lcfr72ii/metadata.json
// Metadata (#5 - Toy Giveaway: Children Need Your Help) URI:  ipfs://bafyreia33fx53vrvh4sa7gotg2kuoqlozrqtb5a7u3czpoxojp3t5cvc6a/metadata.json
// Metadata (#6 - Tutoring Struggling Students) URI:  ipfs://bafyreiffaoi4peh3lhtk6kawfi3z2ox3laog5fopnxmi4sbwelt7gdxf5m/metadata.json
// Metadata (#7 - Community Art: Paint a Mural) URI:  ipfs://bafyreiamhpbucwx25pbaxuoynrdyd46v5xybzcwfxo7pb5zgoliquzksku/metadata.json
// Metadata (#8 - Visit Seniors: Share Love & Stories) URI:  ipfs://bafyreifiitlsi5c2v43qdky4ghqiou4yj6v223fjq63diogqlvsjy266xi/metadata.json
// Metadata (#9 - Clothing Drive for the Less Fortunate) URI:  ipfs://bafyreicfkjdksonuoycwqyls4corjpuudkmnewvv3r7uf45mml7n33vgma/metadata.json

const ALL_BOUNTIES = [
  {
    submissionDeadline: "2023-12-05",
    verificationPeriod: "24",
    uri: "ipfs://bafyreibo2hgtka66poydoa6z53lhfzub4ieeixyf7iyqogux2u242srj4q/metadata.json"
  },
  {
    submissionDeadline: "2023-08-05",
    verificationPeriod: "24",
    uri: "ipfs://bafyreiec6im33lakrwviiqv22zo77vckrm5i4j3a2i5fdgt2yflsw7uy34/metadata.json"
  },
  {
    submissionDeadline: "2023-09-20",
    verificationPeriod: "24",
    uri: "ipfs://bafyreifco4hbickumqmpilscekecwh7cad6n4wdav7p7lqd2ej3io2rch4/metadata.json"
  },
  {
    submissionDeadline: "2023-11-30",
    verificationPeriod: "24",
    uri: "ipfs://bafyreignmnoewbfifx7f3fl54lssq3zgaot7yvvcwoicq4d2upxrhnbjr4/metadata.json"
  },
  {
    submissionDeadline: "2023-08-30",
    verificationPeriod: "24",
    uri: "ipfs://bafyreih4y24ydlfw5adeopzomvneh55v5lranxqw7ukmynspm6lcfr72ii/metadata.json"
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
    uri: "ipfs://bafyreiamhpbucwx25pbaxuoynrdyd46v5xybzcwfxo7pb5zgoliquzksku/metadata.json"
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
