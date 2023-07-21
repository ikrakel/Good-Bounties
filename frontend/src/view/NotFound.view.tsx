import { Typography } from "@mui/joy";
import { Flex } from "../components/Common/Flex";
import { Text } from "../components/Text";

export const NotFoundView = () => {
  return (
    <Flex y yc xc sx={{ height: "100vh" }}>
      <Typography title="h1">Not Found</Typography>
    </Flex>
  );
};
