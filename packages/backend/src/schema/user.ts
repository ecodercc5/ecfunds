import { gql } from "apollo-server-express";
import { UserService } from "../services/user";
import { MutationSignInUserArgs } from "../types/graphql";

export const typeDef = gql`
  extend type Mutation {
    signInUser(uid: String!): User
  }

  type User {
    email: String!
    photoUrl: String
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
};
