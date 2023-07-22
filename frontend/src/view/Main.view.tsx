import { Autocomplete, Box, Chip, Divider, Input, Select, TextField, Typography, useTheme } from "@mui/joy";
import { StatusColors, StatusEnum } from "../models/StatusEnum";
import { Text } from "../components/Text";
import { Flex } from "../components/Common/Flex";
import { Close } from "@mui/icons-material";
import { Countries } from "../data/Countries";
import { BountyCard } from "../components/BountyCard";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import { useMemo, useState, useEffect } from "react";
//@ts-expect-error
import Identicon from "identicon.js";
import { addDays } from "date-fns";
import placeholder from "../assets/placeholder.jpg";
import { MockBounties } from "../data/MockData";
import { DonateModal } from "../components/DonateModal";

import { execute } from '../.graphclient';
import { gql } from "@apollo/client";

const GET_BOUNTIES = gql`
  query GetBounties {
    bounties(first: 10) {
      tokenId,
      createdBy,
      deadline,
      status,
      title,
      description,
      criteria,
      location,
      uri,
      imageUrl,
      totalStakers,
      totalStaked
    }
  }
`;

export const MainView = () => {
  const theme = useTheme();
  const [allBounties, setAllBounties] = useState([]);

  //Bounty ID. Set to undefined to close the modal, or to a Bounty ID to open it
  const [donateModalId, setDonateModalId] = useState<number>();

  const getAllBounties = async () => {
    const result = await execute(GET_BOUNTIES, {})

    if (result.data?.bounties && result.data.bounties.length > 0) {
      setAllBounties(result.data.bounties);
      console.log(result.data.bounties);
    }
  }

  useEffect(() => {
    getAllBounties();
  }, []);

  const getDate = (bounty: any) => {
    const date = new Date(Number(bounty.deadline) * 1000)
    return date;
  }

  const getShortWallet = (bounty: any) => {
    const wallet = bounty.createdBy;
    return wallet.substring(0, 6) + "..." + wallet.substring(wallet.length - 4, wallet.length);
  }

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
        {allBounties.map((bounty: any, i) => (
          <BountyCard
            id={bounty.tokenId}
            image={bounty.imageUrl || placeholder}
            key={bounty.tokenId}
            deadline={getDate(bounty)}
            title={bounty.title}
            location={bounty.location}
            prize={bounty.totalStaked}
            status={bounty.status}
            upvotesCount={0}
            submitterName={getShortWallet(bounty)}
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
