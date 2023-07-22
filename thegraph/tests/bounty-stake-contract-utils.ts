import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  StakeMade,
  StakeWithdrawn
} from "../generated/BountyStakeContract/BountyStakeContract"

export function createStakeMadeEvent(
  tokenId: BigInt,
  staker: Address,
  amount: BigInt
): StakeMade {
  let stakeMadeEvent = changetype<StakeMade>(newMockEvent())

  stakeMadeEvent.parameters = new Array()

  stakeMadeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  stakeMadeEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakeMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return stakeMadeEvent
}

export function createStakeWithdrawnEvent(
  tokenId: BigInt,
  staker: Address,
  amount: BigInt
): StakeWithdrawn {
  let stakeWithdrawnEvent = changetype<StakeWithdrawn>(newMockEvent())

  stakeWithdrawnEvent.parameters = new Array()

  stakeWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  stakeWithdrawnEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakeWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return stakeWithdrawnEvent
}
