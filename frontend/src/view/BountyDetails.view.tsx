import { useLocation, useParams } from "react-router-dom";
import { Text } from "../components/Text";
import { useMemo } from "react";
import { MockBounties } from "../data/MockData";
import { Flex } from "../components/Common/Flex";
import { Button, Chip, Grid, useTheme } from "@mui/joy";
import { StatusColors } from "../models/StatusEnum";
import { differenceInDays } from "date-fns";
import { LocationOn } from "@mui/icons-material";

export const BountyDetailsView = () => {
  const params = useParams();
  const theme = useTheme();

  const bounty = useMemo(() => {
    return MockBounties.find((bounty) => bounty.id === Number(params.id));
  }, [params]);

  const donate = () => {};

  const submit = () => {};

  if (!bounty) return <></>;
  return (
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
              <Text sx={{ fontSize: "1.2rem" }}>7</Text>
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
            <Button color="success" onClick={() => donate()}>
              Donate
            </Button>
            <Button onClick={() => submit()}>Submit</Button>
          </Grid>
        </Grid>
      </Grid>
    </Flex>
  );
};
