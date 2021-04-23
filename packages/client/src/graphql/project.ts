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
      tag
      target
      amountFunded
      backers
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
      tag
      target
      amountFunded
      id
    }
  }
`;

export const BOOKMARK_PROJECT = gql`
  mutation BookmarkProject($projectId: ID!) {
    bookmarkProject(projectId: $projectId)
  }
`;

export const REMOVE_BOOKMARK_FROM_PROJECT = gql`
  mutation RemoveBookmarkFromProject($projectId: ID!) {
    removeBookmarkFromProject(projectId: $projectId)
  }
`;
