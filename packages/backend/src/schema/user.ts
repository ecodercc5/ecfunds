import { gql } from "apollo-server-express";
import { Context } from "../api/context";
import { User } from "../models/user";
import { AuthService } from "../services/auth";
import { UserService } from "../services/user";

export const typeDef = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    signInUser: User
    completeBillingOnboarding: UserBillingOnboarding
  }

  type User {
    name: String!
    email: String!
    photoUrl: String
    chargesEnabled: Boolean!
    id: ID!
  }

  type UserBillingOnboarding {
    link: String
  }
`;

export const resolvers = {
  Query: {
    me: (parent: any, args: any, context: Context) => {
      // console.log(context);

      return context.user;
    },
  },

  Mutation: {
    signInUser: async (parent: any, args: any, context: Context) => {
      // if user exists, return it
      if (context.user) {
        return context.user;
      }

      // get auth header
      const authorization = context.req.header("authorization") || "";

      // get the auth token
      const token = AuthService.getAuthorizationToken(authorization);

      // sign up the user
      const { uid } = await AuthService.decodeToken(token);
      const user = await UserService.signUp(uid);

      return user;
    },

    completeBillingOnboarding: async (_: any, args: any, context: Context) => {
      AuthService.requireAuth(context.user);

      const link = await UserService.createBillingOnboardingLink(context.user!);

      return {
        link,
      };
    },
  },

  User: {
    chargesEnabled: (parent: User) => {
      return parent.billing.chargesEnabled;
    },
  },
};
