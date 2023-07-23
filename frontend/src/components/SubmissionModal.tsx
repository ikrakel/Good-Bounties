import { Button, Card, Divider, Modal, ModalDialog, Textarea, useTheme } from "@mui/joy";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { FC, useCallback, useMemo, useState } from "react";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import { useDropzone } from "react-dropzone";
import { Clickable } from "./css/Button";
import { Bounty } from "../models/Bounty.Model";
import { uploadMetadata } from "../utils/IpfsUtils";
import { CIDString } from "nft.storage/dist/src/lib/interface";
import { BigNumber, ethers } from "ethers";
import { createContributorAttestation } from "../lib/eas/eas-offchain-attester";
import PGBountiesManagerContract from "./abi/PGBountiesManager.json";

interface Props {
  close: () => void;
  bounty: Bounty;
}

const PG_BOUNTIES_ADDRESS = "0x297CDC6d71a2e2321F76dadCDa939A1ffB22c2EC";

export const SubmissionModal: FC<Props> = ({ bounty, close }) => {
  const theme = useTheme();
  const { signer } = useWeb3Auth();

  const [waitingForTransaction, setWaitingForTransaction] = useState(false);
  const [image, setImage] = useState<File>();
  const [description, setDescription] = useState("");
  const [attestationHash, setAttestationHash] = useState<string>("");

  const submit = async () => {
    setWaitingForTransaction(true);

    if (image) {
      const imageCid = "";
      const attestation = await createContributorAttestation(signer!, bounty.createdBy, imageCid, description);
      console.log("attestation", attestation);

      const data = await uploadMetadata(image, attestation);
      setAttestationHash(data.ipnft);
      console.log("proof cid", data.ipnft);

      // call the contract with data.ipnft
      const contract = new ethers.Contract(PG_BOUNTIES_ADDRESS, PGBountiesManagerContract, signer);

      const tx = await contract.connect(signer!).submitProof(BigNumber.from(bounty.tokenId), attestationHash);
      await tx.wait();
    } else {
      console.log("Please upload image");
    }

    close();
    setWaitingForTransaction(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const imageUri = useMemo(() => {
    if (image) return URL.createObjectURL(image);
  }, [image]);

  return (
    <Modal open={true} onClose={() => close()}>
      <ModalDialog size="lg" variant="outlined" sx={{ minWidth: "50vw" }}>
        <Flex y gap3>
          <Text>Submission</Text>
          <Divider />
          <Textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={4}
            variant="soft"
            placeholder="Bounty description"
          />
          {image ? (
            <Flex
              onClick={() => setImage(undefined)}
              sx={{
                // ...Clickable,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${imageUri})`,
                height: "250px",
              }}
            ></Flex>
          ) : (
            <Flex
              component={Card}
              x
              yc
              xc
              {...getRootProps()}
              sx={{ ...Clickable, backgroundColor: theme.palette.primary.softBg, height: "100px" }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </Flex>
          )}
          <Divider />
          <Flex x xe gap2>
            <Button onClick={() => close()} variant="soft" sx={{ width: "100px" }}>
              Cancel
            </Button>
            <Button
              loading={waitingForTransaction}
              onClick={() => submit()}
              disabled={!signer}
              variant="soft"
              color="success"
              sx={{ width: "100px" }}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
