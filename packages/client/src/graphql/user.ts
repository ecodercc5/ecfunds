import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
      email
      photoUrl
      chargesEnabled
      name
      id
    }
  }
`;

export const SIGN_IN_USER = gql`
  mutation SignInUser($uid: String!) {
    signInUser(uid: $uid) {
      name
      email
      photoUrl
      chargesEnabled
      id
    }
  }
`;
