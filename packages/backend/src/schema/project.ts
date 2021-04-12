import { gql } from "apollo-server-express";
import { Context } from "../api/context";
import { Project } from "../models/project";
import { AuthService } from "../services/auth";
import { CommentService } from "../services/comment";
import { ProjectService } from "../services/project";
import {
  QueryGetProjectArgs,
  MutationCreateProjectArgs,
} from "../types/graphql";

export const typeDef = gql`
  extend type Query {
    getProject(id: String!): Project
  }

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
    comments: [Comment!]!
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
  Query: {
    getProject: async (_: any, args: QueryGetProjectArgs) => {
      const projectId = args.id;

      const project = await ProjectService.getById(projectId);

      return project;
    },
  },

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

  Project: {
    comments: async (parent: Project) => {
      const projectId = parent.id;

      const comments = await CommentService.getCommentsFromProject(projectId);

      return comments;
    },
  },
};
