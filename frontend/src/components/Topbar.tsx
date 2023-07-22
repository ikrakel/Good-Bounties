import { Button, CircularProgress, Link, useTheme } from "@mui/joy";
import { cloneElement, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Text } from "./Text";
import { Flex } from "./Common/Flex";
import { useWeb3Auth } from "../contexts/Web3AuthProvider";
//@ts-expect-error
import Identicon from "identicon.js";
import { ADAPTER_STATUS } from "@web3auth/base";
import { useGlobalContext } from "../contexts/GlobalContext";
import logo from "../assets/logo.png";

export const Topbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { setCreateModalOpen } = useGlobalContext();

  const [address, setAddress] = useState("");

  const Items = [
    {
      name: "Discover",
      path: "main",
    },
    {
      name: "Create Bounty",
      onClick: () => setCreateModalOpen(true),
    },
  ];

  const { web3AuthModalPack, signIn, signer } = useWeb3Auth();

  const avatar = useMemo(() => {
    if (!address) return;

    const icon = new Identicon(address, 50);
    icon.background = [0, 0, 0, 0];
    return "data:image/png;base64," + icon.toString();
  }, [address]);

  useEffect(() => {
    if (!signer) return;
    (async () => {
      setAddress(await signer.getAddress());
    })();
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
        backgroundColor: theme.palette.neutral.softBg,
      }}
    >
      <Flex x yc gap={4}>
        {Items.map((item) => {
          return (
            <Link
              key={item.path}
              sx={{ whiteSpace: "nowrap" }}
              onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
            >
              {item.name}
            </Link>
          );
        })}
      </Flex>

      <img src={logo} height="50px" />
      {/* <Text color="success" type="header" sx={{ textAlign: "center", textTransform: "none", fontSize: "1.8rem" }}>
        
      </Text> */}

      {web3AuthModalPack?.web3Auth?.status === ADAPTER_STATUS.CONNECTED ? (
        <Flex
          x
          yc
          gap2
          onClick={() => web3AuthModalPack?.signOut()}
          sx={{
            p: 0.2,
            px: 2,
            border: "1px solid " + theme.palette.divider,
            backgroundColor: theme.palette.primary.solidBg,
            borderRadius: "sm",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.9,
            },
            minWidth: "120px",
          }}
        >
          {!address ? (
            <CircularProgress sx={{ width: "100%" }} />
          ) : (
            <>
              <img src={avatar} height="40px" alt="avatar" />
              <Text sx={{ color: "white" }}>{`${address.slice(0, 6)}...${address.slice(-4)}`}</Text>
            </>
          )}
        </Flex>
      ) : (
        <Button sx={{ width: "120px" }} onClick={() => signIn()}>
          Sign in
        </Button>
      )}
    </Flex>
  );
};
