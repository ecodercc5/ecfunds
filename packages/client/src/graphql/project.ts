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
      tag
      target
      amountFunded
      id
    }
  }
`;
