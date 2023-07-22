import { network } from "hardhat";
import type { ContractReceipt, ContractTransaction, Event } from "ethers";

export async function findEvent(tx: ContractTransaction, name: string): Promise<Event | undefined> {
  const receipt: ContractReceipt = await tx.wait();

  return receipt.events?.find((e: any) => {
    return e.event === name;
  });
}

export function ensureTimestamp(timestamp: number): Promise<unknown> {
  return network.provider.send("evm_setNextBlockTimestamp", [timestamp]);
}