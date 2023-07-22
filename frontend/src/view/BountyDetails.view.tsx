import { useLocation, useParams } from "react-router-dom";
import { Text } from "../components/Text";

export const BountyDetailsView = () => {
  const id = useParams();
  console.log(id);

  return <Text type="header">Bounty Details</Text>;
};
