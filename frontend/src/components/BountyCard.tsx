import { FC } from "react";
import { Flex } from "./Common/Flex";
import { StatusColors, StatusEnum } from "../models/StatusEnum";
import { Text } from "./Text";
import { Card, Divider, useTheme } from "@mui/joy";
import { Favorite, LocationOn, ThumbUp, ThumbUpAlt } from "@mui/icons-material";
import { differenceInDays, format } from "date-fns";
import { Clickable } from "./css/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  image: string;
  title: string;
  location: string;
  status: StatusEnum;
  upvotesCount: number;
  prize: number;
  submitterName: string;
  submitterAvatar: string;
  deadline: Date;
}

export const BountyCard: FC<Props> = ({
  location,
  prize,
  status,
  submitterAvatar,
  submitterName,
  title,
  upvotesCount,
  deadline,
  image,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("/bounty/1")}
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
          <Text sx={{ color: StatusColors[status], fontSize: "0.8rem" }}>◉ {status}</Text>
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
      <Flex y gap1 p={2} pt={0}>
        <Text sx={{ fontWeight: "bold" }}>{title}</Text>

        <Flex x yc gap1>
          <img width="20px" src={submitterAvatar} />
          <Text sx={{ fontSize: "0.8rem" }}>{submitterName}</Text>
        </Flex>

        <Text sx={{ mt: 3, fontWeight: "bold", fontSize: "0.8rem" }}>Reward: {prize.toLocaleString()}$</Text>

        <Flex x xsb yc>
          <Text
            sx={{
              color: theme.palette.neutral[600],
              fontSize: "0.8rem",
            }}
          >
            Expires in {differenceInDays(deadline, new Date())} days
          </Text>
          <Flex x yc gap1 sx={{ color: theme.palette.neutral[600] }}>
            <LocationOn fontSize="small" />{" "}
            <Text sx={{ color: theme.palette.neutral[600], fontSize: "0.8rem" }}>{location}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
