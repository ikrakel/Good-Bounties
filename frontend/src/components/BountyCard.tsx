import { FC } from "react";
import { Flex } from "./Common/Flex";
import { StatusColors, StatusEnum } from "../models/StatusEnum";
import { Text } from "./Text";
import { Card, Divider, useTheme } from "@mui/joy";
import { Favorite, LocationOn, ThumbUp, ThumbUpAlt } from "@mui/icons-material";
import { format } from "date-fns";
import { Clickable } from "./css/Button";
import { useNavigate } from "react-router-dom";

interface Props {
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
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("/bounty/1")}
      sx={{
        "&:hover": { ...Clickable },
        backgroundColor: theme.palette.background.body,
      }}
    >
      <Flex y gap1 sx={{ width: "330px" }}>
        <Flex x xsb yc>
          <Text sx={{ fontWeight: "bold" }}>{title}</Text>
          <Flex x yc gap1 sx={{ color: theme.palette.neutral[600] }}>
            <Favorite fontSize="small" />{" "}
            <Text
              sx={{ color: theme.palette.neutral[600], fontSize: "0.8rem" }}
            >
              {upvotesCount}
            </Text>
          </Flex>
        </Flex>
        <Flex x yc gap1>
          <img width="20px" src={submitterAvatar} />
          <Text sx={{ fontSize: "0.8rem" }}>{submitterName}</Text>
        </Flex>

        <Flex x xsb yc>
          <Text
            sx={{
              color: theme.palette.neutral[600],
              fontSize: "0.8rem",
              my: 2,
            }}
          >
            Expires {format(deadline, "dd MMM yy")}
          </Text>

          <Flex x yc gap1 sx={{ color: theme.palette.neutral[600] }}>
            <LocationOn fontSize="small" />{" "}
            <Text
              sx={{ color: theme.palette.neutral[600], fontSize: "0.8rem" }}
            >
              {location}
            </Text>
          </Flex>
        </Flex>

        <Flex x yc xsb>
          <Text sx={{ color: StatusColors[status], fontSize: "0.8rem" }}>
            ◉ {status}
          </Text>
          <Text sx={{ fontWeight: "bold", fontSize: "0.8rem" }}>
            Reward: {prize.toLocaleString()}$
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
