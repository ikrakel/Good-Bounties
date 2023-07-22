import { Button, Divider, Modal, ModalDialog, Slider } from "@mui/joy";
import { BigNumber, ethers } from "ethers";
import { FC, useMemo, useState } from "react";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import PGBountiesManagerContract from "./abi/PGBountiesManager.json";
import { Bounty } from "../models/Bounty.Model";

interface Props {
  bounty: Bounty;
  close: () => void;
}

const PG_BOUNTIES_ADDRESS = "0x87aD9FbE6c054fe330c996d101716De439eaaB9c";

export const ValidateModal: FC<Props> = ({ bounty, close }) => {
  const { walletBalance, signer } = useWeb3Auth();
  const [waitingForTransaction, setWaitingForTransaction] = useState(false);

  const validate = async () => {
    if (!signer) return;
    setWaitingForTransaction(true);

    const contract = new ethers.Contract(PG_BOUNTIES_ADDRESS, PGBountiesManagerContract, signer);

    const tx = await contract.connect(signer).validateProof(BigNumber.from(bounty.tokenId));
    await tx.wait();

    close();
    setWaitingForTransaction(false);
  };

  const deny = async () => {
    if (!signer) return;
    setWaitingForTransaction(true);

    const contract = new ethers.Contract(PG_BOUNTIES_ADDRESS, PGBountiesManagerContract, signer);

    const tx = await contract.connect(signer).denyProof(BigNumber.from(bounty.tokenId));
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
              onClick={() => validate()}
              disabled={!signer}
              variant="soft"
              color="success"
              sx={{ width: "100px" }}
            >
              Validate
            </Button>
            <Button
              loading={waitingForTransaction}
              onClick={() => deny()}
              disabled={!signer}
              variant="soft"
              color="warning"
              sx={{ width: "100px" }}
            >
              Deny
            </Button>
          </Flex>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
