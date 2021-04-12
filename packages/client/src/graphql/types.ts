export type Maybe<T> = T | null;
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
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  addCommentToProject?: Maybe<Comment>;
  completeBillingOnboarding?: Maybe<UserBillingOnboarding>;
  createProject?: Maybe<Project>;
  signInUser?: Maybe<User>;
};


export type MutationAddCommentToProjectArgs = {
  input: AddCommentToProjectInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  user: CommentUserDetails;
  createdAt: Scalars['Int'];
  projectId: Scalars['ID'];
  id: Scalars['ID'];
};

export type CommentUserDetails = {
  __typename?: 'CommentUserDetails';
  name: Scalars['String'];
  photoUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type AddCommentToProjectInput = {
  projectId: Scalars['ID'];
  content: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  getProject?: Maybe<Project>;
  me?: Maybe<User>;
};


export type QueryGetProjectArgs = {
  id: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['Int'];
  comments: Array<Comment>;
  id: Scalars['ID'];
};

export type ProjectUserDetails = {
  __typename?: 'ProjectUserDetails';
  email: Scalars['String'];
  photoUrl: Scalars['String'];
  id: Scalars['String'];
};

export type CreateProjectInput = {
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  email: Scalars['String'];
  photoUrl?: Maybe<Scalars['String']>;
  chargesEnabled: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type UserBillingOnboarding = {
  __typename?: 'UserBillingOnboarding';
  link?: Maybe<Scalars['String']>;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'photoUrl' | 'chargesEnabled' | 'name' | 'id'>
  )> }
);

export type SignInUserMutationVariables = Exact<{ [key: string]: never; }>;


export type SignInUserMutation = (
  { __typename?: 'Mutation' }
  & { signInUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'email' | 'photoUrl' | 'chargesEnabled' | 'id'>
  )> }
);
