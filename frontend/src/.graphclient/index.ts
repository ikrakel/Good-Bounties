// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { EthglobalParis_2023Types } from './sources/ethglobal-paris-2023/types';
import * as importedModule$0 from "./sources/ethglobal-paris-2023/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bounty: ResolverTypeWrapper<Bounty>;
  BountyStaker: ResolverTypeWrapper<BountyStaker>;
  BountyStaker_filter: BountyStaker_filter;
  BountyStaker_orderBy: BountyStaker_orderBy;
  Bounty_filter: Bounty_filter;
  Bounty_orderBy: Bounty_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  Staker: ResolverTypeWrapper<Staker>;
  Staker_filter: Staker_filter;
  Staker_orderBy: Staker_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bounty: Bounty;
  BountyStaker: BountyStaker;
  BountyStaker_filter: BountyStaker_filter;
  Bounty_filter: Bounty_filter;
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Query: {};
  Staker: Staker;
  Staker_filter: Staker_filter;
  String: Scalars['String'];
  Subscription: {};
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BountyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bounty'] = ResolversParentTypes['Bounty']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  deadline?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  criteria?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalStakers?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalStaked?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bountyStakers?: Resolver<Array<ResolversTypes['BountyStaker']>, ParentType, ContextType, RequireFields<BountybountyStakersArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BountyStakerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BountyStaker'] = ResolversParentTypes['BountyStaker']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bounty?: Resolver<ResolversTypes['Bounty'], ParentType, ContextType>;
  staker?: Resolver<ResolversTypes['Staker'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  bounty?: Resolver<Maybe<ResolversTypes['Bounty']>, ParentType, ContextType, RequireFields<QuerybountyArgs, 'id' | 'subgraphError'>>;
  bounties?: Resolver<Array<ResolversTypes['Bounty']>, ParentType, ContextType, RequireFields<QuerybountiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  bountyStaker?: Resolver<Maybe<ResolversTypes['BountyStaker']>, ParentType, ContextType, RequireFields<QuerybountyStakerArgs, 'id' | 'subgraphError'>>;
  bountyStakers?: Resolver<Array<ResolversTypes['BountyStaker']>, ParentType, ContextType, RequireFields<QuerybountyStakersArgs, 'skip' | 'first' | 'subgraphError'>>;
  staker?: Resolver<Maybe<ResolversTypes['Staker']>, ParentType, ContextType, RequireFields<QuerystakerArgs, 'id' | 'subgraphError'>>;
  stakers?: Resolver<Array<ResolversTypes['Staker']>, ParentType, ContextType, RequireFields<QuerystakersArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type StakerResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Staker'] = ResolversParentTypes['Staker']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  stakedAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  stakedBounties?: Resolver<Array<ResolversTypes['BountyStaker']>, ParentType, ContextType, RequireFields<StakerstakedBountiesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  bounty?: SubscriptionResolver<Maybe<ResolversTypes['Bounty']>, "bounty", ParentType, ContextType, RequireFields<SubscriptionbountyArgs, 'id' | 'subgraphError'>>;
  bounties?: SubscriptionResolver<Array<ResolversTypes['Bounty']>, "bounties", ParentType, ContextType, RequireFields<SubscriptionbountiesArgs, 'skip' | 'first' | 'subgraphError'>>;
  bountyStaker?: SubscriptionResolver<Maybe<ResolversTypes['BountyStaker']>, "bountyStaker", ParentType, ContextType, RequireFields<SubscriptionbountyStakerArgs, 'id' | 'subgraphError'>>;
  bountyStakers?: SubscriptionResolver<Array<ResolversTypes['BountyStaker']>, "bountyStakers", ParentType, ContextType, RequireFields<SubscriptionbountyStakersArgs, 'skip' | 'first' | 'subgraphError'>>;
  staker?: SubscriptionResolver<Maybe<ResolversTypes['Staker']>, "staker", ParentType, ContextType, RequireFields<SubscriptionstakerArgs, 'id' | 'subgraphError'>>;
  stakers?: SubscriptionResolver<Array<ResolversTypes['Staker']>, "stakers", ParentType, ContextType, RequireFields<SubscriptionstakersArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bounty?: BountyResolvers<ContextType>;
  BountyStaker?: BountyStakerResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Staker?: StakerResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = EthglobalParis_2023Types.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/ethglobal-paris-2023/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const ethglobalParis_2023Transforms = [];
const additionalTypeDefs = [] as any[];
const ethglobalParis_2023Handler = new GraphqlHandler({
              name: "ethglobal-paris-2023",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/ikrakel/ethglobal-paris-2023"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("ethglobal-paris-2023"),
              logger: logger.child("ethglobal-paris-2023"),
              importFn,
            });
sources[0] = {
          name: 'ethglobal-paris-2023',
          handler: ethglobalParis_2023Handler,
          transforms: ethglobalParis_2023Transforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));