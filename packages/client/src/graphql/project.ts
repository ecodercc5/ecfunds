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
        }
        projectId
        createdAt
        id
      }
      description
      image
      createdAt
      id
    }
  }
`;
