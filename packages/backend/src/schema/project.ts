import { gql } from "apollo-server-express";
import { Context } from "../api/context";
import { AuthService } from "../services/auth";
import { ProjectService } from "../services/project";
import { MutationCreateProjectArgs } from "../types/graphql";

export const typeDef = gql`
  extend type Mutation {
    createProject(input: CreateProjectInput!): Project
  }

  type Project {
    name: String!
    image: String!
    description: String!
    # user: User!
    # tags: [String!]!
    # amountFunded: Float!
    # backers: Int!
    createdAt: Int!
    # endDate: Int!
    id: ID!
  }

  type ProjectUserDetails {
    email: String!
    photoUrl: String!
    id: String!
  }

  input CreateProjectInput {
    name: String!
    image: String!
    description: String!
  }
`;

export const resolvers = {
  Mutation: {
    createProject: async (
      _: any,
      args: MutationCreateProjectArgs,
      context: Context
    ) => {
      AuthService.requireAuth(context.user);

      const user = context.user!;
      const projectArgs = args.input;

      const project = await ProjectService.create(projectArgs, user);

      return project;
    },
  },
};
