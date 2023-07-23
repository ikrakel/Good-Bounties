import { Autocomplete, Box, Chip, Divider, Grid, Input, Select, TextField, Typography, useTheme } from "@mui/joy";
import { StatusColors, StatusEnum, StatusOptions } from "../models/StatusEnum";
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
import { DonateModal } from "../components/DonateModal";

import { execute } from "../.graphclient";
import { gql } from "@apollo/client";
import { ethers } from "ethers";
import { Bounty } from "../models/Bounty.Model";
import { useQuery } from "@tanstack/react-query";

const GET_BOUNTIES = gql`
  query GetBounties {
    bounties(first: 10) {
      tokenId
      createdBy
      deadline
      status
      title
      description
      criteria
      location
      uri
      imageUrl
      totalStakers
      totalStaked
      bountyStakers {
        id
        amount
        staker {
          id
          address
        }
      }
    }
  }
`;

export const MainView = () => {
  const theme = useTheme();

  //Bounty ID. Set to undefined to close the modal, or to a Bounty ID to open it
  const [donateModalBounty, setDonateModalBounty] = useState<Bounty>();
  const [statusFilter, setStatusFilter] = useState<{ id: string; label: string }>();
  const [locationFilter, setLocationFilter] = useState<string>();
  const [search, setSearch] = useState<string>();

  const { data: allBounties, refetch } = useQuery(
    ["getBounties"],
    async () => {
      const result = await execute(GET_BOUNTIES, {});

      return (result?.data?.bounties as Bounty[]) || [];
    },
    { initialData: [] }
  );

  const getDate = (bounty: any) => {
    const date = new Date(Number(bounty.deadline) * 1000);
    return date;
  };

  const getShortWallet = (bounty: any) => {
    const wallet = bounty.createdBy;
    return wallet.substring(0, 6) + "..." + wallet.substring(wallet.length - 4, wallet.length);
  };

  const filteredBounties = useMemo(() => {
    if (!allBounties) return [];

    let filtered = allBounties;

    if (statusFilter) {
      filtered = filtered.filter((bounty) => bounty.status === statusFilter.id);
    }

    if (locationFilter) {
      filtered = filtered.filter((bounty) => bounty.location === locationFilter);
    }

    if (search) {
      filtered = filtered.filter((bounty) => bounty.title.toLowerCase().includes(search.toLowerCase()));
    }

    return filtered;
  }, [allBounties, locationFilter, search, statusFilter]);

  return (
    <>
      {donateModalBounty && (
        <DonateModal
          bounty={donateModalBounty}
          close={() => {
            setDonateModalBounty(undefined);
            refetch();
          }}
        />
      )}
      <Text type="header">Discover</Text>
      <Flex x yc gap3 my={2}>
        <Input variant="soft" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

        <Autocomplete
          variant="soft"
          placeholder="Filter by status"
          options={StatusOptions}
          value={statusFilter}
          onChange={(e, val) => setStatusFilter(val || undefined)}
        />

        <Autocomplete
          variant="soft"
          placeholder="Filter by country"
          options={Countries.map((country) => country.name)}
          value={locationFilter}
          onChange={(e, val) => setLocationFilter(val || undefined)}
        />
      </Flex>

      <Grid
        container
        spacing={4}
        sx={{
          backgroundColor: theme.palette.background.level1,
          m: "auto",
          mx: -4,
          py: 4,
          mb: -4,
        }}
      >
        {filteredBounties.map((bounty: any, i) => (
          <Grid xs={4}>
            <BountyCard
              tokenId={bounty.tokenId}
              imageUrl={bounty.imageUrl || placeholder}
              key={bounty.tokenId}
              deadline={getDate(bounty)}
              title={bounty.title}
              location={bounty.location}
              totalStaked={bounty.totalStaked}
              status={bounty.status}
              upvotesCount={0}
              createdBy={getShortWallet(bounty)}
              submitterAvatar={"https://i.pravatar.cc/50?u=" + bounty.submitterName}
              onClickDonate={() => setDonateModalBounty(bounty)}
              stakers={bounty.bountyStakers}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
