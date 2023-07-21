import { SmartToy } from "@mui/icons-material";
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  useTheme,
} from "@mui/joy";
import { cloneElement, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "./Text";
import { Flex } from "./Common/Flex";
import { Web3Auth } from "@web3auth/modal";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
//@ts-expect-error
import Identicon from "identicon.js";

const Items = [
  {
    name: "Discover",
    path: "main",
  },
  {
    name: "Start a project",
    path: "create",
  },
];

export const Topbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { web3AuthModalPack, signer } = useWeb3Auth();

  const avatar = useMemo(() => {
    if (!signer) return;

    const icon = new Identicon(signer.address, 50);
    icon.background = [0, 0, 0, 0];
    return "data:image/png;base64," + icon.toString();
  }, [signer]);

  return (
    <Flex
      x
      yc
      xsb
      sx={{
        px: 4,
        height: "60px",
        borderBottom: "1px solid " + theme.palette.divider,
      }}
    >
      <Flex x yc gap={4}>
        {Items.map((item) => {
          return (
            <Link
              key={item.path}
              sx={{ whiteSpace: "nowrap" }}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </Link>
          );
        })}
      </Flex>

      <Text type="header" sx={{ textAlign: "center" }}>
        Public bounties
      </Text>

      {web3AuthModalPack?.web3Auth?.status === "connected" ? (
        <Flex
          x
          yc
          gap2
          onClick={() => web3AuthModalPack?.signOut()}
          sx={{
            p: 0.2,
            px: 2,
            border: "1px solid " + theme.palette.divider,
            backgroundColor: theme.palette.background.surface,
            borderRadius: "sm",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          <img src={avatar} height="40px" />
          <Text sx={{ color: "white" }}>{`${signer?.address.slice(
            0,
            6
          )}...${signer?.address.slice(-4)}`}</Text>
        </Flex>
      ) : (
        <Button
          sx={{ width: "120px" }}
          onClick={() => web3AuthModalPack?.signIn()}
        >
          Sign in
        </Button>
      )}
    </Flex>
  );
};
