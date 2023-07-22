import { Button, Divider, Modal, ModalDialog, Slider } from "@mui/joy";
import { ethers } from "ethers";
import { FC, useMemo, useState } from "react";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import { MockBounties } from "../data/MockData";
import BountyStakeContract from "./abi/BountyStakeContract.json";

interface Props {
  bounty: any;
  close: () => void;
}

const STAKING_ADDRESS = "0xD47C4d8C55BB0B48694662752dD420329Be12b65";

export const DonateModal: FC<Props> = ({ bounty, close }) => {
  const { walletBalance, signer } = useWeb3Auth();
  const [rewardAmount, setRewardAmount] = useState(0);
  const [waitingForTransaction, setWaitingForTransaction] = useState(false);

  const donate = async () => {
    if (!signer) return;
    setWaitingForTransaction(true);

    const contract = new ethers.Contract(
      STAKING_ADDRESS,
      BountyStakeContract,
      signer
    );

    const amount = ethers.utils.parseEther(((Number(rewardAmount) / 100) * Number(walletBalance)).toString());

    const tx = await contract.connect(signer).stake(Number(bounty.id), {value: amount});
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
          <Flex y>
            <Text type="caption">
              {((rewardAmount / 100) * Number(walletBalance)).toLocaleString("en-us", { maximumSignificantDigits: 4 })}{" "}
              MATIC
            </Text>
            <Slider
              onChange={(e, val) => !Array.isArray(val) && setRewardAmount(val)}
              value={rewardAmount}
              min={0}
              max={100}
              marks={[
                { value: 0, label: "0" },
                { value: 50, label: Number(walletBalance) / 2 },
                { value: 100, label: walletBalance },
              ]}
            />
          </Flex>
          <Divider />
          <Flex x xe gap2>
            <Button onClick={() => close()} variant="soft" sx={{ width: "100px" }}>
              Cancel
            </Button>
            <Button loading={waitingForTransaction} onClick={() => donate()} disabled={!signer} variant="soft" color="success" sx={{ width: "100px" }}>
              Donate
            </Button>
          </Flex>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
