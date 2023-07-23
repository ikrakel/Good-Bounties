import { FC } from "react";
import { Flex } from "./Common/Flex";
import { StatusColors, StatusEnum } from "../models/StatusEnum";
import { Text } from "./Text";
import { Button, Card, Divider, useTheme } from "@mui/joy";
import { Favorite, LocationOn, ThumbUp, ThumbUpAlt } from "@mui/icons-material";
import { differenceInDays, format } from "date-fns";
import { Clickable } from "./css/Button";
import { useNavigate } from "react-router-dom";
import { Bounty, BountyStaker } from "../models/Bounty.Model";
import { ethers } from "ethers";
import { MATIC_PRICE } from "../data/Constants";
import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import { GetAvatar, displayEthers, displayInUSD, shortAddress } from "../utils/Utils";

const stateToStatus = {
  0: "Open",
  1: "Submitted",
  2: "Expired",
  3: "Completed",
};

interface Props {
  tokenId: number;
  imageUrl: string;
  title: string;
  location: string;
  status: number;
  upvotesCount: number;
  totalStaked: number;
  createdBy: string;
  submitterAvatar: string;
  deadline: Date;
  onClickDonate: () => void;
  stakers: BountyStaker[];
}

export const BountyCard: FC<Props> = ({
  tokenId,
  location,
  totalStaked: prize,
  status,
  submitterAvatar,
  createdBy: submitterName,
  title,
  upvotesCount,
  deadline,
  imageUrl: image,
  onClickDonate,
  stakers,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/bounty/${tokenId}`)}
      sx={{
        p: 0,
        "&:hover": { ...Clickable },
        backgroundColor: theme.palette.background.body,
        width: "100%",
      }}
    >
      <Flex
        x
        xsb
        ys
        sx={{
          width: "100%",
          height: "150px",
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Flex sx={{ borderRadius: "5px", p: 0.8, backgroundColor: theme.palette.background.body, mt: 1, ml: 1 }}>
          {/* @ts-ignore */}
          <Text sx={{ color: StatusColors[status], fontSize: "0.8rem" }}>◉ {stateToStatus[status]}</Text>
        </Flex>

        <Flex
          x
          yc
          gap1
          sx={{
            borderRadius: "5px",
            p: 0.8,
            mt: 1,
            mr: 1,
            color: theme.palette.neutral[600],
            backgroundColor: theme.palette.background.body,
          }}
        >
          <Favorite fontSize="small" />{" "}
          <Text sx={{ color: theme.palette.neutral[600], fontSize: "0.8rem" }}>{upvotesCount}</Text>
        </Flex>
      </Flex>
      <Flex y ysb gap1 p={2} pt={0} sx={{ flexGrow: 1 }}>
        <Text sx={{ fontWeight: "bold" }}>{title}</Text>

        <Flex x xsb>
          <Flex x yc gap1>
            <AvatarGroup max={4}>
              {stakers.map((staker) => {
                return (
                  <Tooltip title={`$${displayInUSD(staker.amount)} donated by ${shortAddress(staker.staker.address)}`}>
                    <Avatar variant="circular" alt={staker.staker.address} src={GetAvatar(staker.staker.address, 30)} />
                  </Tooltip>
                );
              })}
            </AvatarGroup>
          </Flex>

          <Flex x yc gap1 sx={{ color: theme.palette.neutral[600] }}>
            <LocationOn fontSize="small" />{" "}
            <Text sx={{ color: theme.palette.neutral[600], fontSize: "0.8rem" }}>{location}</Text>
          </Flex>
        </Flex>
        <Flex x xsb ye>
          <Flex y sx={{ justifySelf: "flex-end" }}>
            <Text sx={{ mt: 3, fontWeight: "bold", fontSize: "0.8rem" }}>${displayInUSD(prize)} donated</Text>
            <Flex x xsb yc>
              <Text
                sx={{
                  color: differenceInDays(deadline, new Date()) < 0 ? "red" : theme.palette.neutral[600],
                  fontSize: "0.8rem",
                }}
              >
                {differenceInDays(deadline, new Date()) < 0
                  ? `Expired ${differenceInDays(deadline, new Date()) * -1} days ago`
                  : `Expires in ${differenceInDays(deadline, new Date())} days`}
              </Text>
            </Flex>
          </Flex>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClickDonate();
            }}
            variant="soft"
            color="success"
          >
            Donate
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
