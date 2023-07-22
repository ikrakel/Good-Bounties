import { NFTStorage } from "nft.storage";
import { OffchainAttestationParams } from "@ethereum-attestation-service/eas-sdk";

interface BountyMetadata {
  title: string;
  description: string;
  criteria: string;
  location: string;
  deadline: string;
}

export const uploadMetadata = async (image: File, metadata: BountyMetadata | OffchainAttestationParams) => {
  const nft = {
    image,
    name: "NFT",
    description: "NFT description",
    properties: metadata,
  };

  const client = new NFTStorage({
    token:
      process.env.NFT_STORAGE_TOKEN ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc4ZTY0MmNEQ0VjNjM2M0UxMGQ3ZDEyMEM3QTVCZTlFM2MyMTMwNzIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MDA1MzEwMDg1OSwibmFtZSI6ImV0aGdsb2JhbF9wYXJpcyJ9.TkMEx4WyypGr6rXffjCvUJZYFlnWc1k0qvdfkokdk3g",
  });

  return await client.store(nft);
};
