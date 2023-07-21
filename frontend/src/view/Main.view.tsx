import {
  Autocomplete,
  Chip,
  Divider,
  Input,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/joy";
import { StatusColors, StatusEnum } from "../models/StatusEnum";
import { Text } from "../components/Text";
import { Flex } from "../components/Common/Flex";
import { Close } from "@mui/icons-material";
import { Countries } from "../data/Countries";
import { BountyCard } from "../components/BountyCard";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import { useMemo } from "react";
//@ts-expect-error
import Identicon from "identicon.js";
import { addDays } from "date-fns";

export const MainView = () => {
  const theme = useTheme();

  //Tmp just for testing
  const { web3AuthModalPack, signer } = useWeb3Auth();
  const avatar = useMemo(() => {
    if (!signer) return "";

    const icon = new Identicon(signer.address, 50);
    icon.background = [0, 0, 0, 0];
    return "data:image/png;base64," + icon.toString();
  }, [signer]);
  //Tmp just for testing

  return (
    <>
      <Text type="header">Discover</Text>
      <Flex x yc gap3 my={2}>
        <Input variant="soft" placeholder="Search by keyword" />

        <Autocomplete
          variant="soft"
          placeholder="Search by status"
          disableClearable
          options={Object.values(StatusEnum)}
        />

        <Autocomplete
          variant="soft"
          placeholder="Search by location"
          options={Countries.map((country) => country.name)}
        />
      </Flex>

      <Flex
        x
        xsa
        gap3
        flexWrap="wrap"
        sx={{
          backgroundColor: theme.palette.background.level1,
          mx: -4,
          py: 4,
          mb: -4,
        }}
      >
        {new Array(10).fill("").map((x, i) => (
          <BountyCard
            key={i}
            deadline={addDays(new Date(), 30)}
            title="Plant 1000 trees in France"
            location="France"
            prize={10000}
            status={StatusEnum.Open}
            upvotesCount={120}
            submitterName={
              `${signer?.address.slice(0, 6)}...${signer?.address.slice(-4)}` ||
              ""
            }
            submitterAvatar={avatar}
          />
        ))}
      </Flex>
    </>
  );
};
