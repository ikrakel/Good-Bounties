import { Box, Button } from "@mui/joy";
import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";
import { useQuery } from "@tanstack/react-query";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { AbstractProvider, ethers } from "ethers";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { polygon } from "wagmi/dist/chains";

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
const options: Web3AuthOptions = {
  clientId: process.env.REACT_APP_WEB3_AUTH_CLIENT || "", // https://dashboard.web3auth.io/
  web3AuthNetwork: "testnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x89",
    rpcTarget: "https://rpc.ankr.com/polygon",
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
const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "mandatory",
  },
  adapterSettings: {
    uxMode: "popup",
    whiteLabel: {
      name: "Safe",
    },
  },
});

const web3AuthConfig: Web3AuthConfig = {
  txServiceUrl: "https://safe-transaction-polygon.safe.global",
};

interface Web3AuthContextType {
  web3AuthModalPack?: Web3AuthModalPack;
  provider?: ethers.BrowserProvider;
  signer?: ethers.JsonRpcSigner;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  web3AuthModalPack: undefined,
  provider: undefined,
  signer: undefined,
});

export const Web3AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: web3AuthModalPack } = useQuery(
    ["getWeb3AuthModalPack"],
    async () => {
      // Instantiate and initialize the pack
      const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
      await web3AuthModalPack.init({
        options,
        //@ts-ignore
        adapters: [openloginAdapter],
        modalConfig,
      });
      return web3AuthModalPack;
    }
  );

  const { data: providerAndSigner } = useQuery(
    [
      "getProviderAndSigner",
      !!web3AuthModalPack,
      web3AuthModalPack?.web3Auth?.status,
    ],
    async () => {
      if (!web3AuthModalPack) return { provider: undefined, signer: undefined };

      const web3AuthProvider = web3AuthModalPack.getProvider();
      const provider = web3AuthProvider
        ? //@ts-expect-error
          new ethers.BrowserProvider(web3AuthProvider)
        : undefined;
      const signer = provider ? await provider.getSigner() : undefined;

      return { provider, signer };
    }
  );

  return (
    <Web3AuthContext.Provider
      value={{ web3AuthModalPack, ...providerAndSigner }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  return useContext(Web3AuthContext);
};
