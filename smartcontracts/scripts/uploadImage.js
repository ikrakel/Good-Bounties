#!/usr/bin/node

import fs from 'fs'
import { NFTStorage, File } from 'nft.storage'

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZGOTMwMEMxNWRmMTIxMEMyRTA4YTVEZWY5OTkwRDM4ZTE1MTNmN0IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MDA0NDE0MzM0OCwibmFtZSI6ImV0aGdsb2JhbC1wYXJpcyJ9.4L8ee7qYAQORI0YQVIpifRjCkxeFgCpeSKCNfwj_kBs";

const ALL_DATA = [
  {
    "image": "./images/ethglobal-01.png",
    "title": "Praia do Forte cleanup challenge",
    "location": "Brazil",
    "description": "Answer Praia do Forte's call for help by joining the cleanup challenge. The beach is our playground, and it's time we take responsibility for its upkeep. This challenge involves you, the beachgoer, to collect at least two 50-liter bags of trash during your visits. By doing so, we're not only cleaning up but also actively contributing to the protection of the diverse marine life that thrives here.",
    "criteria": "Collect at least two 50 liter bags with trash from the beach. Attach a before and after photo.",
  },
  {
    "image": "./images/ethglobal-02.jpg",
    "title": "Donate 10 books to Ludlow's library",
    "location": "United Kingdom",
    "description": "Libraries are the cornerstone of any thriving community, and your gently-used books could make all the difference to someone seeking knowledge.",
    "criteria": "Donate a minimum of 10 books in good condition.",
  },
  {
    "image": "./images/ethglobal-03.jpg",
    "title": "Donate blood for the fist time",
    "location": "Germany",
    "description": "Join our blood donation drive to help maintain local blood supply levels.",
    "criteria": "Donate blood at least once. Attach a photograph or documentation of the donation as proof.",
  },
  {
    "image": "./images/ethglobal-04.jpg",
    "title": "Park Clean-Up",
    "location": "Japan",
    "description": "Help maintain the beauty of our local parks by picking up trash during your walks.",
    "criteria": "Collect at least two 50 liter bags with trash from the park. Attach a before and after photo.",
  },
  {
    "image": "./images/ethglobal-05.jpg",
    "title": "Adopt a pet from the Wellington shelter",
    "location": "New Zealand",
    "description": "Adopt a pet from a local shelter to provide them with a loving home.",
    "criteria": "Adopt a pet from a local shelter. Attach the adoption papers or photographs as proof.",
  },
  {
    "image": "./images/ethglobal-06.jpg",
    "title": "Toy Giveaway: Children Need Your Help",
    "location": "USA",
    "description": "Donate unused toys to bring joy to children who may not have any.",
    "criteria": "Collect and donate at least 10 toys. Attach photographs of the toys and the donation process as proof.",
  },
  {
    "image": "./images/ethglobal-07.jpg",
    "title": "Tutoring Struggling Students",
    "location": "India",
    "description": "Offer free tutoring to students who may be struggling in a subject you excel at.",
    "criteria": "Tutor a student for a minimum of 8 hours. Session recordings, study materials, or a testimonial from the student as proof.",
  },
  {
    "image": "./images/ethglobal-08.jpg",
    "title": "Paint a mural in Barrio 31",
    "location": "Argentina",
    "description": "Beautify our community by creating a public mural that brings joy and inspiration to all who pass by.",
    "criteria": "Paint a public mural with a size of at least 10x10 feet. Attach photographs of the mural, both in progress and complete, as proof.",
  },
  {
    "image": "./images/ethglobal-09.jpg",
    "title": "Visit Seniors: Share Love & Stories",
    "location": "France",
    "description": "Visit a local nursing home and spend quality time with seniors who might be lonely.",
    "criteria": "Spend at least 5 hours visiting seniors in a local nursing home. Attach log of visits or testimonial from the nursing home as proof.",
  },
  {
    "image": "./images/ethglobal-10.jpg",
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

const propertiesToAttributesSimple = (properties) => {
  const newProperties = properties;
  delete newProperties["image"];

  return newProperties;
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
      ...propertiesToAttributesSimple(item),
    });

    console.log(`Metadata (#${index} - ${item["title"]}) URI: `, metadata.url)
  });
}

await uploadImage()
