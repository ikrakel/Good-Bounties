import { Box, Button } from "@mui/joy";
import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";
import { useQuery } from "@tanstack/react-query";
import { ADAPTER_EVENTS, ADAPTER_STATUS, CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { ethers } from "ethers";
import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { polygon } from "wagmi/dist/chains";

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
const options: Web3AuthOptions = {
  clientId: process.env.REACT_APP_WEB3_AUTH_CLIENT || "", // https://dashboard.web3auth.io/
  web3AuthNetwork: "testnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    // chainId: "0x89",
    // rpcTarget: "https://rpc.ankr.com/polygon",

    chainId: "0x13881",
    rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
  },
  uiConfig: {
    theme: "light",
    loginMethodsOrder: ["google", "facebook"],
  },
};

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters
const modalConfig = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: "torus",
    showOnModal: false,
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: "metamask",
    showOnDesktop: true,
    showOnMobile: false,
  },
};

// https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization
// const openloginAdapter = new OpenloginAdapter({
//   loginSettings: {
//     mfaLevel: "mandatory",
//   },
//   adapterSettings: {
//     uxMode: "popup",
//     whiteLabel: {
//       name: "Safe",
//     },
//   },
// });

const web3AuthConfig: Web3AuthConfig = {
  txServiceUrl: "https://safe-transaction-polygon.safe.global",
};

interface Web3AuthContextType {
  web3AuthModalPack?: Web3AuthModalPack;
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;
  status: "connected" | "disconnected";
  signIn: () => Promise<void>;
  walletBalance?: ethers.BigNumber;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  web3AuthModalPack: undefined,
  provider: undefined,
  signer: undefined,
  status: "disconnected",
  signIn: async () => {},
  walletBalance: undefined,
});

export const Web3AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //Just used as a way to re-render the component
  const [status, setStatus] = useState<"connected" | "disconnected">("disconnected");

  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [walletBalance, setWalletBalance] = useState<ethers.BigNumber>();

  const { data: web3AuthModalPack } = useQuery(["getWeb3AuthModalPack"], async () => {
    // Instantiate and initialize the pack
    const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
    await web3AuthModalPack.init({
      options,
      adapters: [],
      modalConfig,
    });

    return web3AuthModalPack;
  });

  const updateSigner = useCallback(async () => {
    const web3AuthProvider = web3AuthModalPack?.getProvider();
    const provider = web3AuthProvider ? new ethers.providers.Web3Provider(web3AuthProvider) : undefined;
    const signer = provider ? await provider.getSigner() : undefined;
    const balance = signer ? await provider?.getBalance(await signer.getAddress()) : undefined;
    setProvider(provider);
    setSigner(signer);
    setWalletBalance(balance);
  }, [web3AuthModalPack]);

  const walletStatusUpdated = useCallback(async () => {
    const status = web3AuthModalPack?.web3Auth?.status === ADAPTER_STATUS.CONNECTED ? "connected" : "disconnected";

    setStatus(status);
    if (status === "disconnected") {
      console.log("disconnect");
      setSigner(undefined);
      setProvider(undefined);
    } else {
      updateSigner();
    }
  }, [updateSigner, web3AuthModalPack?.web3Auth?.status]);

  useEffect(() => {
    if (!web3AuthModalPack) return;

    web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, walletStatusUpdated);

    web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, walletStatusUpdated);

    walletStatusUpdated();

    return () => {
      web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.CONNECTED, walletStatusUpdated);
      web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.DISCONNECTED, walletStatusUpdated);
    };
  }, [walletStatusUpdated, web3AuthModalPack]);

  const signIn = async () => {
    const response = await web3AuthModalPack?.signIn();
    if (!response) return;
    updateSigner();
  };

  return (
    <Web3AuthContext.Provider value={{ walletBalance, web3AuthModalPack, provider, signer, status, signIn }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  return useContext(Web3AuthContext);
};
