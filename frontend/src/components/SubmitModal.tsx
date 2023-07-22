import { Button, Divider, Modal, ModalDialog, Slider } from "@mui/joy";
import { BigNumber, ethers } from "ethers";
import { FC, useMemo, useState } from "react";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import PGBountiesManagerContract from "./abi/PGBountiesManager.json";
import { Bounty } from "../models/Bounty.Model";
import storeContributorAttestation from "../lib/eas/eas-offchain-attester";

//UNUSED FOR NOW
const submit = (signer: ethers.providers.JsonRpcSigner) => {
  console.log("submitting");
  console.log("signer in submit", signer);
  if (signer) {
    storeContributorAttestation(signer, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "ipfsHash");
  }
};

interface Props {
  bounty: Bounty;
  close: () => void;
}

const PG_BOUNTIES_ADDRESS = "0x87aD9FbE6c054fe330c996d101716De439eaaB9c";

export const SubmitModal: FC<Props> = ({ bounty, close }) => {
  const { walletBalance, signer } = useWeb3Auth();
  // TODO: temp hardcoded
  const [attestationHash, setAttestationHash] = useState<string>(
    "mtwirsqawjuoloq2gvtyug2tc3jbf5htm2zeo4rsknfiv3fdp46a"
  );
  const [waitingForTransaction, setWaitingForTransaction] = useState(false);

  const submit = async () => {
    if (!signer) return;
    setWaitingForTransaction(true);

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
              onClick={() => submit()}
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
