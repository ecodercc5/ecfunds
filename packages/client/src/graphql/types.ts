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
  Date: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  addCommentToProject?: Maybe<Comment>;
  bookmarkProject: BookmarkProjectMutationResponse;
  completeBillingOnboarding?: Maybe<UserBillingOnboarding>;
  createProject?: Maybe<Project>;
  fundProject: Scalars['String'];
  removeBookmarkFromProject: RemoveBookmarkFromProjectMutationResponse;
  signInUser?: Maybe<User>;
};


export type MutationAddCommentToProjectArgs = {
  input: AddCommentToProjectInput;
};


export type MutationBookmarkProjectArgs = {
  projectId: Scalars['ID'];
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationFundProjectArgs = {
  input: FundProjectInput;
};


export type MutationRemoveBookmarkFromProjectArgs = {
  projectId: Scalars['ID'];
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  user: CommentUserDetails;
  createdAt: Scalars['Date'];
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
  getBackedProjects: Array<Project>;
  getProject?: Maybe<Project>;
  getProjects: Array<Project>;
  getTags: Array<Maybe<Tag>>;
  me?: Maybe<User>;
};


export type QueryGetProjectArgs = {
  id: Scalars['ID'];
};

export enum Tag {
  Tech = 'TECH',
  Art = 'ART',
  Clothing = 'CLOTHING',
  Food = 'FOOD',
  Film = 'FILM'
}

export type Project = {
  __typename?: 'Project';
  name: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  tag: Tag;
  target: Scalars['Float'];
  amountFunded: Scalars['Float'];
  backers: Scalars['Int'];
  createdAt: Scalars['Date'];
  comments: Array<Comment>;
  isBookmarked: Scalars['Boolean'];
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
  tag: Tag;
  target: Scalars['Float'];
};

export type BookmarkProjectMutationResponse = {
  __typename?: 'BookmarkProjectMutationResponse';
  projectId: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type RemoveBookmarkFromProjectMutationResponse = {
  __typename?: 'RemoveBookmarkFromProjectMutationResponse';
  projectId: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type FundProjectInput = {
  amount: Scalars['Float'];
  projectId: Scalars['ID'];
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

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { getProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'name' | 'description' | 'image' | 'tag' | 'target' | 'amountFunded' | 'backers' | 'createdAt' | 'id'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'content' | 'projectId' | 'createdAt' | 'id'>
      & { user: (
        { __typename?: 'CommentUserDetails' }
        & Pick<CommentUserDetails, 'name' | 'photoUrl' | 'id'>
      ) }
    )> }
  )> }
);

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { getProjects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'name' | 'image' | 'isBookmarked' | 'tag' | 'target' | 'amountFunded' | 'id'>
  )> }
);

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'name' | 'image' | 'description' | 'tag' | 'target' | 'amountFunded' | 'backers' | 'createdAt' | 'isBookmarked' | 'id'>
  )> }
);

export type BookmarkProjectMutationVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type BookmarkProjectMutation = (
  { __typename?: 'Mutation' }
  & { bookmarkProject: (
    { __typename?: 'BookmarkProjectMutationResponse' }
    & Pick<BookmarkProjectMutationResponse, 'projectId' | 'success'>
  ) }
);

export type RemoveBookmarkFromProjectMutationVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type RemoveBookmarkFromProjectMutation = (
  { __typename?: 'Mutation' }
  & { removeBookmarkFromProject: (
    { __typename?: 'RemoveBookmarkFromProjectMutationResponse' }
    & Pick<RemoveBookmarkFromProjectMutationResponse, 'projectId' | 'success'>
  ) }
);

export type FundProjectMutationVariables = Exact<{
  input: FundProjectInput;
}>;


export type FundProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'fundProject'>
);

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

export type CompleteBillingOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteBillingOnboardingMutation = (
  { __typename?: 'Mutation' }
  & { completeBillingOnboarding?: Maybe<(
    { __typename?: 'UserBillingOnboarding' }
    & Pick<UserBillingOnboarding, 'link'>
  )> }
);
