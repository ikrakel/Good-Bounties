import { Button, Divider, Modal, ModalDialog, Slider } from "@mui/joy";
import { FC, useMemo, useState } from "react";
import { Flex } from "./Common/Flex";
import { Text } from "./Text";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import { MockBounties } from "../data/MockData";

interface Props {
  id: number;
  close: () => void;
}

export const DonateModal: FC<Props> = ({ id, close }) => {
  const { walletBalance } = useWeb3Auth();
  const [rewardAmount, setRewardAmount] = useState(0);

  const bounty = useMemo(() => {
    return MockBounties.find((bounty) => bounty.id === id);
  }, [id]);

  const donate = () => {
    console.log("donate " + rewardAmount);
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
            <Button onClick={() => donate()} variant="soft" color="success" sx={{ width: "100px" }}>
              Donate
            </Button>
          </Flex>
        </Flex>
      </ModalDialog>
    </Modal>
  );
};
