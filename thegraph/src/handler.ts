import { BigInt, ipfs, json } from "@graphprotocol/graph-ts"
import {
  BountyStakeContract,
  BountyContract,
  StakeMade,
  StakeWithdrawn,
  BountyCreated,
  StateUpdate
} from "../generated/BountyStakeContract/BountyStakeContract"
import { Bounty, BountyStaker, Stakers } from "../generated/schema"

export function handleStakeMade(event: StakeMade): void {
  let bounty = Bounty.load(event.params.tokenId.toString());
  if (!bounty) {
    bounty = new Bounty(event.params.tokenId.toString());
    bounty.totalStakers = BigInt.fromI32(1);
    bounty.totalStaked = event.params.amount;
    bounty.save();
  } else {
    bounty.totalStakers = bounty.totalStakers.plus(BigInt.fromI32(1));
    bounty.totalStaked = bounty.totalStaked.plus(event.params.amount);
    bounty.save();
  }

  let staker = Stakers.load(event.params.staker.toHexString());
  if (!staker) {
    staker = new Stakers(event.params.staker.toHexString());
    staker.address = event.params.staker.toHexString();
    staker.stakedAmount = event.params.amount;
  } else {
    staker.stakedAmount = staker.stakedAmount.plus(event.params.amount);
  }
  staker.save();

  let relationshipId = event.params.tokenId.toString() + "-" + event.params.staker.toHexString();
  let bountyStaker = BountyStaker.load(relationshipId);
  if (!bountyStaker) {
    bountyStaker = new BountyStaker(relationshipId);
    bountyStaker.bounty = event.params.tokenId.toString();
    bountyStaker.staker = event.params.staker.toHexString();
    bountyStaker.stakedAmount = event.params.amount;
  } else {
    bountyStaker.stakedAmount = bountyStaker.stakedAmount.plus(event.params.amount);
  }
  bountyStaker.save();
}

export function handleStakeWithdrawn(event: StakeWithdrawn): void {
  let bounty = Bounty.load(event.params.tokenId.toString());
  if (bounty) {
    bounty.totalStakers = bounty.totalStakers.minus(BigInt.fromI32(1));
    bounty.totalStaked = bounty.totalStaked.minus(event.params.amount);
    bounty.save();
  }

  let staker = Stakers.load(event.params.staker.toHexString());
  if (staker) {
    staker.stakedAmount = staker.stakedAmount.minus(event.params.amount);
    staker.save();
  }

  let relationshipId = event.params.tokenId.toString() + "-" + event.params.staker.toHexString();
  let bountyStaker = BountyStaker.load(relationshipId);
  if (!bountyStaker) {
    bountyStaker.stakedAmount = bountyStaker.stakedAmount.minus(event.params.amount);
    bountyStaker.save();
  }
}

export function handleBountyCreated(event: BountyCreated): void {
  let bounty = Bounty.load(event.params.tokenId.toString());
  if (!bounty) {
    bounty = new Bounty(event.params.tokenId.toString());
    bounty.createdBy = event.params.owner;
    bounty.tokenId = event.params.tokenId.toString();
    bounty.totalStakers = BigInt.fromI32(0);
    bounty.totalStaked = BigInt.fromI32(0);

    let bountyContract = BountyContract.bind(event.address);
    bounty.deadline = bountyContract.getBounty(event.params.tokenId).submissionDeadline;
    bounty.status = bountyContract.getBounty(event.params.tokenId).state;

    let bountyURI = bountyContract.tokenURI(event.params.tokenId);
    bounty.uri = bountyURI;

    let hash = bountyURI.split("ipfs://").join("");
    let data = ipfs.cat(hash);
    if (data) {
      let value = json.fromBytes(data).toObject();
      let image = value.get("image");
      if (image) {
        let h = image.toString();
        let imageHash = h.split("ipfs://").join("");
        bounty.imageUrl = "https://ipfs.io/ipfs/" + imageHash;
      }

      let title = value.get("title");
      if (title) {
        bounty.title = title;
      }

      let description = value.get("description");
      if (description) {
        bounty.description = description;
      }

      let criteria = value.get("criteria");
      if (criteria) {
        bounty.criteria = criteria;
      }

      let location = value.get("location");
      if (location) {
        bounty.location = location;
      }
    }
  }
  bounty.save();
}

export function handleStateUpdate(event: StateUpdate): void {
  let bounty = Bounty.load(event.params.tokenId.toString());
  bounty.state = event.params.state;
  bounty.save();
}