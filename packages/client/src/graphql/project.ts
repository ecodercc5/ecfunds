import { gql } from "@apollo/client";

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      name
      comments {
        content
        user {
          name
          photoUrl
          id
        }
        projectId
        createdAt
        id
      }
      description
      image
      target
      amountFunded
      backers
      isBookmarked
      createdAt
      id
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      name
      image
      isBookmarked
      target
      amountFunded
      id
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      name
      image
      description
      target
      amountFunded
      backers
      createdAt
      isBookmarked
      id
    }
  }
`;

export const ADD_COMMENT_TO_PROJECT = gql`
  mutation AddCommentToProject($input: AddCommentToProjectInput!) {
    addCommentToProject(input: $input) {
      user {
        name
        photoUrl
        id
      }
      content
      createdAt
      projectId
      id
    }
  }
`;

export const BOOKMARK_PROJECT = gql`
  mutation BookmarkProject($projectId: ID!) {
    bookmarkProject(projectId: $projectId) {
      projectId
      success
    }
  }
`;

export const REMOVE_BOOKMARK_FROM_PROJECT = gql`
  mutation RemoveBookmarkFromProject($projectId: ID!) {
    removeBookmarkFromProject(projectId: $projectId) {
      projectId
      success
    }
  }
`;

export const FUND_PROJECT = gql`
  mutation FundProject($input: FundProjectInput!) {
    fundProject(input: $input)
  }
`;
