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

export const displayEthers = (amount?: ethers.BigNumber | string) => {
  if (typeof amount === "string") amount = ethers.BigNumber.from(amount);
  if (!amount) return "0";
  const remainder = amount.mod(1e14);
  return ethers.utils.formatEther(amount.sub(remainder));
};

export const displayInUSD = (amount: ethers.BigNumber | string) => {
  if (typeof amount === "string") amount = ethers.BigNumber.from(amount);
  if (!amount) return "0";
  amount = amount.mul(MATIC_PRICE);
  const remainder = amount.mod(1e15);
  return ethers.utils.formatEther(amount.sub(remainder));
};

export const shortAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
