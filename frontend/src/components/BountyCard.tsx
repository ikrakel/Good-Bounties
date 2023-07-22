import { FC } from "react";
import { Flex } from "./Common/Flex";
import { StatusColors, StatusEnum } from "../models/StatusEnum";
import { Text } from "./Text";
import { Button, Card, Divider, useTheme } from "@mui/joy";
import { Favorite, LocationOn, ThumbUp, ThumbUpAlt } from "@mui/icons-material";
import { differenceInDays, format } from "date-fns";
import { Clickable } from "./css/Button";
import { useNavigate } from "react-router-dom";
import { Bounty } from "../models/Bounty.Model";
import { ethers } from "ethers";
import { MATIC_PRICE } from "../data/Constants";

const stateToStatus = {
  0: "Open",
  1: "Submitted",
  2: "Expired",
  3: "Completed",
};

interface Props extends Bounty {
  onClickDonate: () => void;
}

export const BountyCard: FC<Props> = ({
  id,
  location,
  prize,
  status,
  submitterAvatar,
  submitterName,
  title,
  upvotesCount,
  deadline,
  image,
  onClickDonate,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/bounty/${id}`)}
      sx={{
        p: 0,
        "&:hover": { ...Clickable },
        backgroundColor: theme.palette.background.body,
        width: "330px",
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
            <Flex
              sx={{
                backgroundSize: "contain",
                borderRadius: "100px",
                width: "30px",
                height: "30px",
                backgroundImage: `url(${submitterAvatar})`,
              }}
            ></Flex>
            <Text sx={{ fontSize: "0.8rem" }}>{submitterName}</Text>
          </Flex>

          <Flex x yc gap1 sx={{ color: theme.palette.neutral[600] }}>
            <LocationOn fontSize="small" />{" "}
            <Text sx={{ color: theme.palette.neutral[600], fontSize: "0.8rem" }}>{location}</Text>
          </Flex>
        </Flex>
        <Flex x xsb ye>
          <Flex y sx={{ justifySelf: "flex-end" }}>
            <Text sx={{ mt: 3, fontWeight: "bold", fontSize: "0.8rem" }}>
              $
              {(MATIC_PRICE * Number(ethers.utils.formatEther(prize))).toLocaleString("en-us", {
                maximumSignificantDigits: 4,
              })}{" "}
              donated
            </Text>

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
