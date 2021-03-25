import { gql } from "apollo-server-express";
import { User } from "../models/user";
import { UserService } from "../services/user";
import { MutationSignInUserArgs } from "../types/graphql";

export const typeDef = gql`
  extend type Mutation {
    signInUser(uid: String!): User
  }

  type User {
    name: String!
    email: String!
    photoUrl: String
    chargesEnabled: Boolean!
    id: ID!
  }
`;

export const resolvers = {
  Mutation: {
    signInUser: async (parent: any, { uid }: MutationSignInUserArgs) => {
      console.log({ uid });

      const user = await UserService.signIn(uid);

      return user;
    },
  },

  User: {
    chargesEnabled: (parent: User) => {
      return parent.billing.chargesEnabled;
    },
  },
};
