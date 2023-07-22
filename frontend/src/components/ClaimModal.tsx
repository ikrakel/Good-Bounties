import { Button, Divider, Modal, ModalDialog, Slider } from "@mui/joy";
import { ethers } from "ethers";
import { FC, useMemo, useState } from "react";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import BountyStakeContract from "./abi/BountyStakeContract.json";
import { Bounty } from "../models/Bounty.Model";
import { MATIC_PRICE } from "../data/Constants";

interface Props {
  bounty: Bounty;
  close: () => void;
}

const STAKING_ADDRESS = "0xD47C4d8C55BB0B48694662752dD420329Be12b65";

export const ClaimModal: FC<Props> = ({ bounty, close }) => {
  const { walletBalance, signer } = useWeb3Auth();
  const [waitingForTransaction, setWaitingForTransaction] = useState(false);

  const claim = async () => {
    if (!signer) return;
    setWaitingForTransaction(true);

    const contract = new ethers.Contract(STAKING_ADDRESS, BountyStakeContract, signer);

    const tx = await contract.connect(signer).withdraw(Number(bounty.tokenId));
    await tx.wait();

    close();
    setWaitingForTransaction(false);
  };

  const claimThroughRelayKit = async () => {

  }

  return (
    <Modal open={true} onClose={() => close()}>
      <ModalDialog size="lg" variant="outlined" sx={{ minWidth: "50vw" }}>
        <Flex y gap3>
          <Text>{bounty?.title}</Text>
          <Divider />
          <Flex y>
            <Text>
              <strong>${(MATIC_PRICE * Number(ethers.utils.formatEther(bounty.totalStaked))).toLocaleString("en-us", {
                maximumSignificantDigits: 4,
              })}</strong> is available to be claimed since this bounty was successfully completed.
            </Text>
          </Flex>
          <Divider />
          <Flex x xe gap2>
            <Button onClick={() => close()} variant="soft" sx={{ width: "100px" }}>
              Cancel
            </Button>
            <Button
              loading={waitingForTransaction}
              onClick={() => claim()}
              disabled={!signer}
              variant="soft"
              color="success"
              sx={{ width: "100px" }}
            >
              Claim
            </Button>
          </Flex>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
