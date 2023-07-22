import { useLocation, useParams } from "react-router-dom";
import { Text } from "../components/Text";
import { useMemo, useState, useEffect } from "react";
import { MockBounties } from "../data/MockData";
import { Flex } from "../components/Common/Flex";
import { Button, Chip, Divider, Grid, Tab, TabList, TabPanel, Tabs, useTheme } from "@mui/joy";
import { StatusColors } from "../models/StatusEnum";
import { differenceInDays } from "date-fns";
import { LocationOn } from "@mui/icons-material";
import { DonateModal } from "../components/DonateModal";
import { Bounty } from "../models/Bounty.Model";

import { execute } from '../.graphclient';
import { gql } from "@apollo/client";

const GET_BOUNTIES = gql`
  query GetBounty($tokenId: Int!) {
    bounty(id: $tokenId) {
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
      totalStaked,
      bountyStakers {
        id,
        amount,
        staker {
          id,
          address
        }
      }
    }
  }
`;

const stateToStatus = {
  0: "Open",
  1: "Submitted",
  2: "Expired",
  3: "Completed",
}

export const BountyDetailsView = () => {
  const [bounty, setBounty] = useState({} as Bounty);
  const params = useParams();
  const theme = useTheme();
  const [donateModalId, setDonateModalId] = useState<number>();
  const [tab, setTab] = useState(0);

  const loadBounty = async () => {
    const result = await execute(GET_BOUNTIES, {tokenId: Number(params.id)})

    if (result.data?.bounty) {
      const b = result.data.bounty;
      setBounty({
        id: b.tokenId,
        image: b.imageUrl,
        title: b.title,
        location: b.location,
        status: b.status,
        upvotesCount: 0,
        prize: b.totalStaked,
        submitterName: b.createdBy,
        submitterAvatar: b.createdBy,
        // @ts-ignore
        totalStakers: b.totalStakers,
        description: b.description,
        criteria: b.criteria,
        deadline: new Date(Number(b.deadline) * 1000)
      });
    }
  };

  useEffect(() => {
    loadBounty();
  }, [params]);

  const submit = () => {};

  if (!bounty) return <></>;
  return (
    <>
      {donateModalId && <DonateModal id={donateModalId} close={() => setDonateModalId(undefined)} />}
      <Flex y gap3>
        <Text sx={{ textAlign: "center" }} type="header">
          {bounty.title}
        </Text>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid xs={7}>
            <img src={bounty.image} width="100%" />
          </Grid>
          <Grid xs={5} container rowSpacing={8} height={"80%"} my={"auto"} px={4}>
            <Grid xs={12}>
              <Text sx={{ color: StatusColors[bounty.status], fontSize: "1rem" }}>◉ {bounty.status}</Text>
            </Grid>
            <Grid xs={6}>
              <Flex y>
                <Text color="success" type="body" sx={{ fontSize: "1.5rem" }}>
                  ${bounty.prize}
                </Text>
                <Text type="light">Reward</Text>
              </Flex>
            </Grid>
            <Grid xs={6}>
              <Flex y>
                {/* @ts-ignore */}
                <Text sx={{ fontSize: "1.2rem" }}>{bounty.totalStakers}</Text>
                <Text type="light">Funders</Text>
              </Flex>
            </Grid>
            <Grid xs={6}>
              <Flex y>
                <Text sx={{ fontSize: "1.2rem" }} type="body">
                  {differenceInDays(bounty.deadline, new Date())}
                </Text>
                <Text type="light">Days to expire</Text>
              </Flex>
            </Grid>
            <Grid xs={6}>
              <Flex y>
                <Text sx={{ fontSize: "1.2rem" }}>{bounty.location}</Text>
                <Text type="light">Location</Text>
              </Flex>
            </Grid>
            <Grid xs={12} display="flex" columnGap={2}>
              <Button variant="soft" color="success" onClick={() => setDonateModalId(bounty.id)}>
                Donate
              </Button>
              <Button onClick={() => submit()}>Submit</Button>
            </Grid>
          </Grid>
        </Grid>
        <Flex x yc gap2>
          <Button onClick={() => setTab(0)} variant={tab === 0 ? "soft" : "plain"}>
            About
          </Button>
          <Button onClick={() => setTab(1)} variant={tab === 1 ? "soft" : "plain"}>
            Submissions
          </Button>
        </Flex>
        <Divider sx={{ mt: -2 }} />
        {tab === 0 &&
          <Flex y={true}>
            <Text type="header2">
              Description
            </Text>
            <Text type="body">
              {/* @ts-ignore */}
              {bounty.description}
            </Text>
            <Text type="header2" sx={{ mt: 3 }}>
              Acceptance Criteria
            </Text>
            <Text type="body">
              {/* @ts-ignore */}
              {bounty.criteria}
            </Text>
          </Flex>}

        {tab === 1 && <Flex>No submissions yet</Flex>}
      </Flex>
    </>
  );
};
