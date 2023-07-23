import { ethers } from "ethers";

export interface Bounty {
  tokenId: number;
  imageUrl: string;
  title: string;
  location: string;
  status: string;
  upvotesCount: number;
  totalStaked: string;
  totalStakers: number;
  createdBy: string;
  submitterAvatar: string;
  deadline: number;
  criteria: string;
  description: string;
  bountyStakers: BountyStaker[];
}

export interface BountyStaker {
  amount: string;
  staker: {
    address: string;
  };
}
