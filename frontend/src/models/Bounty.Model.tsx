export interface Bounty {
  tokenId: number;
  imageUrl: string;
  title: string;
  location: string;
  status: number;
  upvotesCount: number;
  totalStaked: number;
  totalStakers: number;
  createdBy: string;
  submitterAvatar: string;
  deadline: number;
  criteria: string;
  description: string;
}
