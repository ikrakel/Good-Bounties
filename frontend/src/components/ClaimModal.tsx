import { Button, Divider, Modal, ModalDialog, Slider } from "@mui/joy";
import { ethers } from "ethers";
import { FC, useMemo, useState, useEffect } from "react";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import BountyStakeContract from "./abi/BountyStakeContract.json";
import { Bounty } from "../models/Bounty.Model";
import { MATIC_PRICE } from "../data/Constants";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";

interface Props {
  bounty: Bounty;
  close: () => void;
}

const STAKING_ADDRESS = "0x914F89B08965198EAba0aee44865E2A613847b09";

export const ClaimModal: FC<Props> = ({ bounty, close }) => {
  const { walletBalance, signer } = useWeb3Auth();
  const [relayKitUrl, setRelayKitUrl] = useState(null);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
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
    if (!signer) return;

    setWaitingForTransaction(true);

    const contract = new ethers.Contract(STAKING_ADDRESS, BountyStakeContract, signer);
    const { data } = await contract.connect(signer).populateTransaction.withdraw(Number(bounty.tokenId));

    const request = {
      chainId: await signer.getChainId(),
      target: STAKING_ADDRESS,
      data: data,
      gasLimit: "100000",
      isSponsored: true,
      user: await signer.getAddress()
    };

    const relayKit = new GelatoRelay();
    // @ts-ignore
    const response = await relayKit.sponsoredCall(request, "JcpsXW8SvuPmeHlMEwVgvW_JjzMiF8L72Qj17PQQ944_");

    // @ts-ignore
    setRelayKitUrl(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
    console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`);
  }

  useEffect(() => {
    if (relayKitUrl && !paymentInProgress) {
      setPaymentInProgress(true);
      trackRelayProgress();
    }
  }, [relayKitUrl]);

  const trackRelayProgress = async () => {
    // @ts-ignore
    const response = await fetch(relayKitUrl);
    const data = await response.json();

    if (data?.task?.taskState === "ExecSuccess") {
      setRelayKitUrl(null);
      setPaymentInProgress(false);
      setWaitingForTransaction(false);
    } else {
      setTimeout(trackRelayProgress, 1000);
    }
  };

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
