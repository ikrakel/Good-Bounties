import { useLocation, useParams } from "react-router-dom";
import { ethers } from "ethers";
import { Text } from "../components/Text";
import { useMemo, useState, useEffect } from "react";
import { Flex } from "../components/Common/Flex";
import { Button, CircularProgress, Divider, Grid, useTheme } from "@mui/joy";
import { StatusColors, StatusEnum, StatusOptions } from "../models/StatusEnum";
import { differenceInDays } from "date-fns";
import { LocationOn } from "@mui/icons-material";
import { DonateModal } from "../components/DonateModal";
import { ClaimModal } from "../components/ClaimModal";
import { Bounty } from "../models/Bounty.Model";

import { execute } from "../.graphclient";
import { gql } from "@apollo/client";
import { MATIC_PRICE } from "../data/Constants";

import { useWeb3Auth } from "../contexts/Web3AuthProvider";
import { ValidateModal } from "../components/ValidateModal";
import { useQueries, useQuery } from "@tanstack/react-query";
import { SubmissionModal } from "../components/SubmissionModal";
import { GetAvatar, displayInUSD, shortAddress } from "../utils/Utils";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";

const GET_BOUNTIES = gql`
  query GetBounty($tokenId: Int!) {
    bounty(id: $tokenId) {
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

export const BountyDetailsView = () => {
  const params = useParams();
  const theme = useTheme();
  const { signer, provider } = useWeb3Auth();

  const [donateModal, setDonateModal] = useState<Bounty>();
  const [submitModal, setSubmitModal] = useState<Bounty>();
  const [validateModal, setValidateModal] = useState<Bounty>();
  const [claimModal, setClaimModal] = useState<Bounty>();
  const [tab, setTab] = useState(0);

  const { data: bounty, refetch } = useQuery(["getBountyById", params.id], async () => {
    const result = await execute(GET_BOUNTIES, { tokenId: Number(params.id) });
    return result?.data?.bounty as Bounty;
  });

  const status = useMemo(() => {
    return StatusOptions.find((status) => status.id === bounty?.status)?.label;
  }, [bounty]);

  if (!bounty)
    return (
      <Flex y xc yc height="calc(100vh)">
        <CircularProgress />
      </Flex>
    );
  return (
    <>
      {submitModal && (
        <SubmissionModal
          bounty={bounty}
          close={() => {
            setSubmitModal(undefined);
            refetch();
          }}
        />
      )}
      {donateModal && (
        <DonateModal
          bounty={bounty}
          close={() => {
            setDonateModal(undefined);
            refetch();
          }}
        />
      )}
      {claimModal && <ClaimModal bounty={bounty} close={() => setClaimModal(undefined)} />}
      {validateModal && <ValidateModal bounty={bounty} close={() => setValidateModal(undefined)} />}
      <Flex y gap3>
        <Text sx={{ textAlign: "center" }} type="header">
          {bounty.title}
        </Text>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid xs={7}>
            <img src={bounty.imageUrl} width="100%" />
          </Grid>
          <Grid xs={5} container rowSpacing={8} height={"80%"} my={"auto"} px={4}>
            <Grid xs={12}>
              <Text sx={{ color: StatusColors[bounty.status as keyof typeof StatusColors], fontSize: "1rem" }}>
                ◉ {status}
              </Text>
            </Grid>
            <Grid xs={6}>
              <Flex y>
                <Text color="success" type="body" sx={{ fontSize: "1.5rem" }}>
                  $
                  {(MATIC_PRICE * Number(ethers.utils.formatEther(bounty.totalStaked))).toLocaleString("en-us", {
                    maximumSignificantDigits: 4,
                  })}
                </Text>
                <Text type="light">Reward</Text>
              </Flex>
            </Grid>
            <Grid xs={6}>
              <Flex xs y>
                <AvatarGroup max={4}>
                  {bounty.bountyStakers.map((staker) => {
                    return (
                      <Tooltip
                        title={`$${displayInUSD(staker.amount)} donated by ${shortAddress(staker.staker.address)}`}
                      >
                        <Avatar
                          variant="circular"
                          alt={staker.staker.address}
                          src={GetAvatar(staker.staker.address, 30)}
                        />
                      </Tooltip>
                    );
                  })}
                </AvatarGroup>
                <Text type="light">Donors</Text>
              </Flex>
            </Grid>
            <Grid xs={6}>
              <Flex y>
                <Text sx={{ fontSize: "1.2rem" }} type="body">
                  {differenceInDays(new Date(bounty.deadline * 1000), new Date())}
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
              <Button variant="soft" color="success" onClick={() => setDonateModal(bounty)}>
                Donate
              </Button>
              <Button onClick={() => setSubmitModal(bounty)}>Submit</Button>
              {/* //TODO: HIDE ONE */}
              <Button onClick={() => setValidateModal(bounty)}>Validate</Button>
              <Button color="success" variant="outlined" onClick={() => setClaimModal(bounty)}>
                Claim
              </Button>
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
        {tab === 0 && (
          <Flex y={true}>
            <Text type="header2">Description</Text>
            <Text type="body">{bounty.description}</Text>
            <Text type="header2" sx={{ mt: 3 }}>
              Acceptance Criteria
            </Text>
            <Text type="body">{bounty.criteria}</Text>
          </Flex>
        )}

        {tab === 1 && <Flex>No submissions yet</Flex>}
      </Flex>
    </>
  );
};
