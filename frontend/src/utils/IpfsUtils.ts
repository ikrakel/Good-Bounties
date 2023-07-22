// import { createHelia } from "helia";
// import { dagJson } from "@helia/dag-json";
// import { unixfs } from "@helia/unixfs";
// import { json } from "@helia/json";

export const dummy = {};

// interface BountyMetadata {
//   title: string;
//   description: string;
//   criteria: string;
//   location: string;
//   deadline: string;
// }

// export const UploadMetadata = async (imageFile: File, metadata: BountyMetadata) => {
//   const helia = await createHelia();

//   const j = json(helia);
//   const fs = unixfs(helia);

//   const reader = new FileReader();
//   reader.readAsArrayBuffer(imageFile);
//   reader.onloadend = async (e) => {
//     if (e.target?.readyState === FileReader.DONE) {
//       const arrayBuffer = e.target.result;
//       const array = new Uint8Array(arrayBuffer as ArrayBuffer);
//       const imageAddress = await fs.addBytes(array);
//       const cid = await j.add({ ...metadata, image: imageAddress });
//       console.log(cid);
//       console.log(await j.get(cid));
//     }
//   };
// };
