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
  mutation SignInUser {
    signInUser {
      name
      email
      photoUrl
      chargesEnabled
      id
    }
  }
`;

export const COMPLETE_BILLING_ONBOARDING = gql`
  mutation CompleteBillingOnboarding {
    completeBillingOnboarding {
      link
    }
  }
`;
