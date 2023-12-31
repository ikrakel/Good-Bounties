import { EAS, Offchain, SchemaEncoder, OffchainAttestationParams } from "@ethereum-attestation-service/eas-sdk";
import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
// import { TypedDataSigner } from "@ethersproject/abstract-signer";

const createContributorAttestation = async (
  signer: ethers.providers.JsonRpcSigner,
  recipient: string,
  imageCid: string,
  description: string
): Promise<OffchainAttestationParams> => {
  // const eas = new EAS("0xC2679fBD37d54388Ce493F1DB75320D236e1815e");
  // eas.connect(signer.provider);

  // const offchain: Offchain = await eas.getOffchain();

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("bytes32 imageCid, string description");
  const encodedData = schemaEncoder.encodeData([
    {
      name: "imageCid",
      value: imageCid,
      type: "bytes32",
    },
    { name: "description", value: description, type: "string" },
  ]);
  console.log("encoded data", encodedData);

  const proofMetadata: OffchainAttestationParams = {
    recipient: recipient,
    // Unix timestamp of when attestation expires. (0 for no expiration)
    expirationTime: 0,
    // Unix timestamp of current time
    time: Date.now(),
    revocable: false,
    version: 1,
    nonce: 0,
    schema: "0xdf4c41ea0f6263c72aa385580124f41f2898d3613e86c50519fc3cfd7ff13ad4",
    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
    data: encodedData,
  };
  return proofMetadata;
  // try {
  //   const offchainAttestation = await offchain.signOffchainAttestation(signer);
  //   console.log("offchain attestation", offchainAttestation);
  // } catch (e) {
  //   console.log("Attestation Error", e);
  // }
};

export { createContributorAttestation };
