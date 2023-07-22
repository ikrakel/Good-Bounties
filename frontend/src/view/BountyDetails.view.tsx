import { useLocation, useParams } from "react-router-dom";
import { Text } from "../components/Text";
import { useMemo, useState } from "react";
import { MockBounties } from "../data/MockData";
import { Flex } from "../components/Common/Flex";
import { Button, Chip, Divider, Grid, Tab, TabList, TabPanel, Tabs, useTheme } from "@mui/joy";
import { StatusColors } from "../models/StatusEnum";
import { differenceInDays } from "date-fns";
import { LocationOn } from "@mui/icons-material";

export const BountyDetailsView = () => {
  const params = useParams();
  const theme = useTheme();

  const [tab, setTab] = useState(0);

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
            <Button variant="soft" color="success" onClick={() => donate()}>
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
      {tab === 0 && <Flex>Add description and criterias here</Flex>}

      {tab === 1 && <Flex>No submissions yet</Flex>}
    </Flex>
  );
};
