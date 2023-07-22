import { StatusEnum } from "./StatusEnum";

export interface Bounty {
  id: number;
  image: string;
  title: string;
  location: string;
  status: number;
  upvotesCount: number;
  prize: number;
  submitterName: string;
  submitterAvatar: string;
  deadline: Date;
}
