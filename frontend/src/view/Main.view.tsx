import { Autocomplete, Box, Chip, Divider, Input, Select, TextField, Typography, useTheme } from "@mui/joy";
import { StatusColors, StatusEnum } from "../models/StatusEnum";
import { Text } from "../components/Text";
import { Flex } from "../components/Common/Flex";
import { Close } from "@mui/icons-material";
import { Countries } from "../data/Countries";
import { BountyCard } from "../components/BountyCard";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import { useMemo, useState } from "react";
//@ts-expect-error
import Identicon from "identicon.js";
import { addDays } from "date-fns";
import placeholder from "../assets/placeholder.jpg";
import { MockBounties } from "../data/MockData";
import { DonateModal } from "../components/DonateModal";

export const MainView = () => {
  const theme = useTheme();

  //Bounty ID. Set to undefined to close the modal, or to a Bounty ID to open it
  const [donateModalId, setDonateModalId] = useState<number>();

  return (
    <>
      {donateModalId && <DonateModal id={donateModalId} close={() => setDonateModalId(undefined)} />}
      <Text type="header">Discover</Text>
      <Flex x yc gap3 my={2}>
        <Input variant="soft" placeholder="Search" />

        <Autocomplete
          variant="soft"
          placeholder="Filter by status"
          disableClearable
          options={Object.values(StatusEnum)}
        />

        <Autocomplete
          variant="soft"
          placeholder="Filter by country"
          options={Countries.map((country) => country.name)}
        />
      </Flex>

      <Box
        sx={{
          backgroundColor: theme.palette.background.level1,
          mx: -4,
          py: 4,
          mb: -4,
          px: 4,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
          gap: 2,
        }}
      >
        {MockBounties.map((bounty, i) => (
          <BountyCard
            id={bounty.id}
            image={bounty.image || placeholder}
            key={bounty.title}
            deadline={bounty.deadline}
            title={bounty.title}
            location={bounty.location}
            prize={bounty.prize}
            status={bounty.status}
            upvotesCount={bounty.upvotesCount}
            submitterName={bounty.submitterName}
            submitterAvatar={"https://i.pravatar.cc/50?u=" + bounty.submitterName}
            onClickDonate={() => setDonateModalId(bounty.id)}
          />
        ))}
      </Box>
      {/* <Flex
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
      ></Flex> */}
    </>
  );
};
