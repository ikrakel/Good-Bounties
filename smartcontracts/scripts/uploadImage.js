import fs from 'fs'
import { NFTStorage, File } from 'nft.storage'

const token = process.env.TOKEN;

const ALL_DATA = [
  {
    "image": "images/ethglobal-01.jpg",
    "title": "Beach Clean-up",
    "location": "Brazil",
    "description": "Protect marine life and keep our beaches clean by collecting and disposing of litter during your visits.",
    "criteria": "Collect at least two 50 liter bags with trash from the beach. Attach a before and after photo.",
  },
  {
    "image": "images/ethglobal-02.jpg",
    "title": "Donate Books to a Local Library",
    "location": "United Kingdom",
    "description": "Libraries are the cornerstone of any thriving community, and your gently-used books could make all the difference to someone seeking knowledge.",
    "criteria": "Donate a minimum of 10 books in good condition.",
  },
  {
    "image": "images/ethglobal-03.jpg",
    "title": "Donate Blood, Save Lives",
    "location": "Germany",
    "description": "Join our blood donation drive to help maintain local blood supply levels.",
    "criteria": "Donate blood at least once. Attach a photograph or documentation of the donation as proof.",
  },
  {
    "image": "images/ethglobal-04.jpg",
    "title": "Park Clean-Up",
    "location": "Japan",
    "description": "Help maintain the beauty of our local parks by picking up trash during your walks.",
    "criteria": "Collect at least two 50 liter bags with trash from the park. Attach a before and after photo.",
  },
  {
    "image": "images/ethglobal-05.jpg",
    "title": "Adopt a Pet, Change a Life",
    "location": "New Zealand",
    "description": "Adopt a pet from a local shelter to provide them with a loving home.",
    "criteria": "Adopt a pet from a local shelter. Attach the adoption papers or photographs as proof.",
  },
  {
    "image": "images/ethglobal-06.jpg",
    "title": "Toy Giveaway: Children Need Your Help",
    "location": "USA",
    "description": "Donate unused toys to bring joy to children who may not have any.",
    "criteria": "Collect and donate at least 10 toys. Attach photographs of the toys and the donation process as proof.",
  },
  {
    "image": "images/ethglobal-07.jpg",
    "title": "Tutoring Struggling Students",
    "location": "India",
    "description": "Offer free tutoring to students who may be struggling in a subject you excel at.",
    "criteria": "Tutor a student for a minimum of 8 hours. Session recordings, study materials, or a testimonial from the student as proof.",
  },
  {
    "image": "images/ethglobal-08.jpg",
    "title": "Community Art: Paint a Mural",
    "location": "Argentina",
    "description": "Beautify our community by creating a public mural that brings joy and inspiration to all who pass by.",
    "criteria": "Paint a public mural with a size of at least 10x10 feet. Attach photographs of the mural, both in progress and complete, as proof.",
  },
  {
    "image": "images/ethglobal-09.jpg",
    "title": "Visit Seniors: Share Love & Stories",
    "location": "France",
    "description": "Visit a local nursing home and spend quality time with seniors who might be lonely.",
    "criteria": "Spend at least 5 hours visiting seniors in a local nursing home. Attach log of visits or testimonial from the nursing home as proof.",
  },
  {
    "image": "images/ethglobal-10.jpg",
    "title": "Clothing Drive for the Less Fortunate",
    "location": "Canada",
    "description": "Host a clothes drive in your neighborhood and donate the collected items to a local charity.",
    "criteria": "Collect and donate a minimum of 30 items of clothing. Attach donation receipt or photographs as proof.",
  }
]

const propertiesToAttributes = (properties) => {
  return Object.keys(properties).filter(k => k != "image").map((key) => ({
    trait_type: key,
    value: properties[key],
  }));
}

async function uploadImage() {
  const client = new NFTStorage({ token: TOKEN });

  ALL_DATA.forEach(async (item, index) => {
    const data = await fs.promises.readFile(item["image"]);

    console.log("setting ipfs metadata");
    const metadata = await client.store({
      name: `ETHGlobal PG Bounties ${index}`,
      description: "Public Good Bounties. An EthGlobal project.",
      properties: {
        type: "image",
      },
      image: new File(
        [
          data
        ],
        item["image"],
        { type: 'image/jpg' }
      ),
      attributes: [
        ...propertiesToAttributes(item),
      ],
    });

    console.log("Metadata for: ", item["title"]);
    console.log('Metadata URI: ', metadata.url)
  });
}

await uploadImage()
