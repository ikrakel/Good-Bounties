import { Button, Divider, Modal, ModalDialog, Slider } from "@mui/joy";
import { BigNumber, ethers } from "ethers";
import { FC, useMemo, useState } from "react";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import PGBountiesManagerContract from "./abi/PGBountiesManager.json";
import { Bounty } from "../models/Bounty.Model";
import { createContributorAttestation } from "../lib/eas/eas-offchain-attester";

//UNUSED FOR NOW
const createAndSign = (
  signer: ethers.providers.JsonRpcSigner,
  bounty: Bounty,
  imageCid: string,
  description: string
) => {
  console.log("submitting");
  console.log("signer in submit", signer);
  if (signer) {
  }
};

interface Props {
  bounty: Bounty;
  close: () => void;
}

const PG_BOUNTIES_ADDRESS = "0x297CDC6d71a2e2321F76dadCDa939A1ffB22c2EC";

export const SubmitModal: FC<Props> = ({ bounty, close }) => {
  const { walletBalance, signer } = useWeb3Auth();
  // TODO: temp hardcoded
  const [attestationHash, setAttestationHash] = useState<string>(
    "mtwirsqawjuoloq2gvtyug2tc3jbf5htm2zeo4rsknfiv3fdp46a"
  );
  const [waitingForTransaction, setWaitingForTransaction] = useState(false);

  const submit = async (imageCid: string, description: string) => {
    if (!signer) return;
    setWaitingForTransaction(true);

    const attestation = createContributorAttestation(signer, "0x0" /*bounty.createdBy*/, imageCid, description);

    const contract = new ethers.Contract(PG_BOUNTIES_ADDRESS, PGBountiesManagerContract, signer);

    const tx = await contract.connect(signer).submitProof(BigNumber.from(bounty.tokenId), attestationHash);
    await tx.wait();

    close();
    setWaitingForTransaction(false);
  };

  return (
    <Modal open={true} onClose={() => close()}>
      <ModalDialog size="lg" variant="outlined" sx={{ minWidth: "50vw" }}>
        <Flex y gap3>
          <Text>{bounty?.title}</Text>
          <Divider />
          <Divider />
          <Flex x xe gap2>
            <Button onClick={() => close()} variant="soft" sx={{ width: "100px" }}>
              Cancel
            </Button>
            <Button
              loading={waitingForTransaction}
              onClick={() => submit("", "")}
              disabled={!signer}
              variant="soft"
              color="success"
              sx={{ width: "100px" }}
            >
              Upload
            </Button>
          </Flex>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
