import { BigNumberish, ethers } from "ethers";

//@ts-expect-error
import Identicon from "identicon.js";
import { MATIC_PRICE } from "../data/Constants";

export const GetAvatar = (address: string, size = 40) => {
  const icon = new Identicon(address, size);
  icon.background = [0, 0, 0, 255];
  icon.margin = 0.18;
  return "data:image/png;base64," + icon.toString();
};

export const displayEthers = (amount: BigNumberish) => {
  return Number(ethers.utils.formatEther(amount)).toLocaleString("en-us", { maximumSignificantDigits: 4 });
};

export const displayInUSD = (amount: BigNumberish) => {
  return (MATIC_PRICE * Number(ethers.utils.formatEther(amount))).toLocaleString("en-us", {
    maximumSignificantDigits: 4,
  });
};

export const shortAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
