// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace EthglobalParis_2023Types {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Bounty = {
  id: Scalars['ID'];
  tokenId: Scalars['BigInt'];
  createdBy: Scalars['Bytes'];
  deadline: Scalars['BigInt'];
  status: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  criteria: Scalars['String'];
  location: Scalars['String'];
  uri: Scalars['String'];
  imageUrl: Scalars['String'];
  totalStakers: Scalars['BigInt'];
  totalStaked: Scalars['BigInt'];
  bountyStakers: Array<BountyStaker>;
};


export type BountybountyStakersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BountyStaker_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BountyStaker_filter>;
};

export type BountyStaker = {
  id: Scalars['ID'];
  bounty: Bounty;
  staker: Staker;
  amount: Scalars['BigInt'];
};

export type BountyStaker_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  bounty?: InputMaybe<Scalars['String']>;
  bounty_not?: InputMaybe<Scalars['String']>;
  bounty_gt?: InputMaybe<Scalars['String']>;
  bounty_lt?: InputMaybe<Scalars['String']>;
  bounty_gte?: InputMaybe<Scalars['String']>;
  bounty_lte?: InputMaybe<Scalars['String']>;
  bounty_in?: InputMaybe<Array<Scalars['String']>>;
  bounty_not_in?: InputMaybe<Array<Scalars['String']>>;
  bounty_contains?: InputMaybe<Scalars['String']>;
  bounty_contains_nocase?: InputMaybe<Scalars['String']>;
  bounty_not_contains?: InputMaybe<Scalars['String']>;
  bounty_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bounty_starts_with?: InputMaybe<Scalars['String']>;
  bounty_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bounty_not_starts_with?: InputMaybe<Scalars['String']>;
  bounty_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bounty_ends_with?: InputMaybe<Scalars['String']>;
  bounty_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bounty_not_ends_with?: InputMaybe<Scalars['String']>;
  bounty_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bounty_?: InputMaybe<Bounty_filter>;
  staker?: InputMaybe<Scalars['String']>;
  staker_not?: InputMaybe<Scalars['String']>;
  staker_gt?: InputMaybe<Scalars['String']>;
  staker_lt?: InputMaybe<Scalars['String']>;
  staker_gte?: InputMaybe<Scalars['String']>;
  staker_lte?: InputMaybe<Scalars['String']>;
  staker_in?: InputMaybe<Array<Scalars['String']>>;
  staker_not_in?: InputMaybe<Array<Scalars['String']>>;
  staker_contains?: InputMaybe<Scalars['String']>;
  staker_contains_nocase?: InputMaybe<Scalars['String']>;
  staker_not_contains?: InputMaybe<Scalars['String']>;
  staker_not_contains_nocase?: InputMaybe<Scalars['String']>;
  staker_starts_with?: InputMaybe<Scalars['String']>;
  staker_starts_with_nocase?: InputMaybe<Scalars['String']>;
  staker_not_starts_with?: InputMaybe<Scalars['String']>;
  staker_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  staker_ends_with?: InputMaybe<Scalars['String']>;
  staker_ends_with_nocase?: InputMaybe<Scalars['String']>;
  staker_not_ends_with?: InputMaybe<Scalars['String']>;
  staker_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  staker_?: InputMaybe<Staker_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BountyStaker_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BountyStaker_filter>>>;
};

export type BountyStaker_orderBy =
  | 'id'
  | 'bounty'
  | 'bounty__id'
  | 'bounty__tokenId'
  | 'bounty__createdBy'
  | 'bounty__deadline'
  | 'bounty__status'
  | 'bounty__title'
  | 'bounty__description'
  | 'bounty__criteria'
  | 'bounty__location'
  | 'bounty__uri'
  | 'bounty__imageUrl'
  | 'bounty__totalStakers'
  | 'bounty__totalStaked'
  | 'staker'
  | 'staker__id'
  | 'staker__address'
  | 'staker__stakedAmount'
  | 'amount';

export type Bounty_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdBy?: InputMaybe<Scalars['Bytes']>;
  createdBy_not?: InputMaybe<Scalars['Bytes']>;
  createdBy_gt?: InputMaybe<Scalars['Bytes']>;
  createdBy_lt?: InputMaybe<Scalars['Bytes']>;
  createdBy_gte?: InputMaybe<Scalars['Bytes']>;
  createdBy_lte?: InputMaybe<Scalars['Bytes']>;
  createdBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_contains?: InputMaybe<Scalars['Bytes']>;
  createdBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  deadline?: InputMaybe<Scalars['BigInt']>;
  deadline_not?: InputMaybe<Scalars['BigInt']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']>;
  deadline_lt?: InputMaybe<Scalars['BigInt']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<Scalars['String']>;
  status_not?: InputMaybe<Scalars['String']>;
  status_gt?: InputMaybe<Scalars['String']>;
  status_lt?: InputMaybe<Scalars['String']>;
  status_gte?: InputMaybe<Scalars['String']>;
  status_lte?: InputMaybe<Scalars['String']>;
  status_in?: InputMaybe<Array<Scalars['String']>>;
  status_not_in?: InputMaybe<Array<Scalars['String']>>;
  status_contains?: InputMaybe<Scalars['String']>;
  status_contains_nocase?: InputMaybe<Scalars['String']>;
  status_not_contains?: InputMaybe<Scalars['String']>;
  status_not_contains_nocase?: InputMaybe<Scalars['String']>;
  status_starts_with?: InputMaybe<Scalars['String']>;
  status_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_starts_with?: InputMaybe<Scalars['String']>;
  status_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  status_ends_with?: InputMaybe<Scalars['String']>;
  status_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status_not_ends_with?: InputMaybe<Scalars['String']>;
  status_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_not?: InputMaybe<Scalars['String']>;
  title_gt?: InputMaybe<Scalars['String']>;
  title_lt?: InputMaybe<Scalars['String']>;
  title_gte?: InputMaybe<Scalars['String']>;
  title_lte?: InputMaybe<Scalars['String']>;
  title_in?: InputMaybe<Array<Scalars['String']>>;
  title_not_in?: InputMaybe<Array<Scalars['String']>>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_contains_nocase?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']>;
  title_starts_with?: InputMaybe<Scalars['String']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']>;
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  title_ends_with?: InputMaybe<Scalars['String']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']>;
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  criteria?: InputMaybe<Scalars['String']>;
  criteria_not?: InputMaybe<Scalars['String']>;
  criteria_gt?: InputMaybe<Scalars['String']>;
  criteria_lt?: InputMaybe<Scalars['String']>;
  criteria_gte?: InputMaybe<Scalars['String']>;
  criteria_lte?: InputMaybe<Scalars['String']>;
  criteria_in?: InputMaybe<Array<Scalars['String']>>;
  criteria_not_in?: InputMaybe<Array<Scalars['String']>>;
  criteria_contains?: InputMaybe<Scalars['String']>;
  criteria_contains_nocase?: InputMaybe<Scalars['String']>;
  criteria_not_contains?: InputMaybe<Scalars['String']>;
  criteria_not_contains_nocase?: InputMaybe<Scalars['String']>;
  criteria_starts_with?: InputMaybe<Scalars['String']>;
  criteria_starts_with_nocase?: InputMaybe<Scalars['String']>;
  criteria_not_starts_with?: InputMaybe<Scalars['String']>;
  criteria_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  criteria_ends_with?: InputMaybe<Scalars['String']>;
  criteria_ends_with_nocase?: InputMaybe<Scalars['String']>;
  criteria_not_ends_with?: InputMaybe<Scalars['String']>;
  criteria_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  location_not?: InputMaybe<Scalars['String']>;
  location_gt?: InputMaybe<Scalars['String']>;
  location_lt?: InputMaybe<Scalars['String']>;
  location_gte?: InputMaybe<Scalars['String']>;
  location_lte?: InputMaybe<Scalars['String']>;
  location_in?: InputMaybe<Array<Scalars['String']>>;
  location_not_in?: InputMaybe<Array<Scalars['String']>>;
  location_contains?: InputMaybe<Scalars['String']>;
  location_contains_nocase?: InputMaybe<Scalars['String']>;
  location_not_contains?: InputMaybe<Scalars['String']>;
  location_not_contains_nocase?: InputMaybe<Scalars['String']>;
  location_starts_with?: InputMaybe<Scalars['String']>;
  location_starts_with_nocase?: InputMaybe<Scalars['String']>;
  location_not_starts_with?: InputMaybe<Scalars['String']>;
  location_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  location_ends_with?: InputMaybe<Scalars['String']>;
  location_ends_with_nocase?: InputMaybe<Scalars['String']>;
  location_not_ends_with?: InputMaybe<Scalars['String']>;
  location_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  imageUrl_not?: InputMaybe<Scalars['String']>;
  imageUrl_gt?: InputMaybe<Scalars['String']>;
  imageUrl_lt?: InputMaybe<Scalars['String']>;
  imageUrl_gte?: InputMaybe<Scalars['String']>;
  imageUrl_lte?: InputMaybe<Scalars['String']>;
  imageUrl_in?: InputMaybe<Array<Scalars['String']>>;
  imageUrl_not_in?: InputMaybe<Array<Scalars['String']>>;
  imageUrl_contains?: InputMaybe<Scalars['String']>;
  imageUrl_contains_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_not_contains?: InputMaybe<Scalars['String']>;
  imageUrl_not_contains_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_starts_with?: InputMaybe<Scalars['String']>;
  imageUrl_starts_with_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  imageUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_ends_with?: InputMaybe<Scalars['String']>;
  imageUrl_ends_with_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  imageUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  totalStakers?: InputMaybe<Scalars['BigInt']>;
  totalStakers_not?: InputMaybe<Scalars['BigInt']>;
  totalStakers_gt?: InputMaybe<Scalars['BigInt']>;
  totalStakers_lt?: InputMaybe<Scalars['BigInt']>;
  totalStakers_gte?: InputMaybe<Scalars['BigInt']>;
  totalStakers_lte?: InputMaybe<Scalars['BigInt']>;
  totalStakers_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStakers_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStaked?: InputMaybe<Scalars['BigInt']>;
  totalStaked_not?: InputMaybe<Scalars['BigInt']>;
  totalStaked_gt?: InputMaybe<Scalars['BigInt']>;
  totalStaked_lt?: InputMaybe<Scalars['BigInt']>;
  totalStaked_gte?: InputMaybe<Scalars['BigInt']>;
  totalStaked_lte?: InputMaybe<Scalars['BigInt']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bountyStakers_?: InputMaybe<BountyStaker_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bounty_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bounty_filter>>>;
};

export type Bounty_orderBy =
  | 'id'
  | 'tokenId'
  | 'createdBy'
  | 'deadline'
  | 'status'
  | 'title'
  | 'description'
  | 'criteria'
  | 'location'
  | 'uri'
  | 'imageUrl'
  | 'totalStakers'
  | 'totalStaked'
  | 'bountyStakers';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  bounty?: Maybe<Bounty>;
  bounties: Array<Bounty>;
  bountyStaker?: Maybe<BountyStaker>;
  bountyStakers: Array<BountyStaker>;
  staker?: Maybe<Staker>;
  stakers: Array<Staker>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerybountyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybountiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bounty_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bounty_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybountyStakerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybountyStakersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BountyStaker_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BountyStaker_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Staker_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Staker_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Staker = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  stakedAmount: Scalars['BigInt'];
  stakedBounties: Array<BountyStaker>;
};


export type StakerstakedBountiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BountyStaker_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BountyStaker_filter>;
};

export type Staker_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  stakedAmount?: InputMaybe<Scalars['BigInt']>;
  stakedAmount_not?: InputMaybe<Scalars['BigInt']>;
  stakedAmount_gt?: InputMaybe<Scalars['BigInt']>;
  stakedAmount_lt?: InputMaybe<Scalars['BigInt']>;
  stakedAmount_gte?: InputMaybe<Scalars['BigInt']>;
  stakedAmount_lte?: InputMaybe<Scalars['BigInt']>;
  stakedAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stakedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stakedBounties_?: InputMaybe<BountyStaker_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Staker_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Staker_filter>>>;
};

export type Staker_orderBy =
  | 'id'
  | 'address'
  | 'stakedAmount'
  | 'stakedBounties';

export type Subscription = {
  bounty?: Maybe<Bounty>;
  bounties: Array<Bounty>;
  bountyStaker?: Maybe<BountyStaker>;
  bountyStakers: Array<BountyStaker>;
  staker?: Maybe<Staker>;
  stakers: Array<Staker>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionbountyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbountiesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bounty_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bounty_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbountyStakerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbountyStakersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BountyStaker_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BountyStaker_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Staker_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Staker_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  bounty: InContextSdkMethod<Query['bounty'], QuerybountyArgs, MeshContext>,
  /** null **/
  bounties: InContextSdkMethod<Query['bounties'], QuerybountiesArgs, MeshContext>,
  /** null **/
  bountyStaker: InContextSdkMethod<Query['bountyStaker'], QuerybountyStakerArgs, MeshContext>,
  /** null **/
  bountyStakers: InContextSdkMethod<Query['bountyStakers'], QuerybountyStakersArgs, MeshContext>,
  /** null **/
  staker: InContextSdkMethod<Query['staker'], QuerystakerArgs, MeshContext>,
  /** null **/
  stakers: InContextSdkMethod<Query['stakers'], QuerystakersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  bounty: InContextSdkMethod<Subscription['bounty'], SubscriptionbountyArgs, MeshContext>,
  /** null **/
  bounties: InContextSdkMethod<Subscription['bounties'], SubscriptionbountiesArgs, MeshContext>,
  /** null **/
  bountyStaker: InContextSdkMethod<Subscription['bountyStaker'], SubscriptionbountyStakerArgs, MeshContext>,
  /** null **/
  bountyStakers: InContextSdkMethod<Subscription['bountyStakers'], SubscriptionbountyStakersArgs, MeshContext>,
  /** null **/
  staker: InContextSdkMethod<Subscription['staker'], SubscriptionstakerArgs, MeshContext>,
  /** null **/
  stakers: InContextSdkMethod<Subscription['stakers'], SubscriptionstakersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["ethglobal-paris-2023"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
