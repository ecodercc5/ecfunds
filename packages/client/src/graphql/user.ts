import { gql } from "@apollo/client";

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
