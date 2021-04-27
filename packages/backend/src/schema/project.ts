import { gql } from "apollo-server-express";
import { Context } from "../api/context";
import { Project } from "../models/project";
import { AuthService } from "../services/auth";
import { CommentService } from "../services/comment";
import { ProjectService } from "../services/project";
import {
  QueryGetProjectArgs,
  MutationCreateProjectArgs,
  MutationBookmarkProjectArgs,
  MutationRemoveBookmarkFromProjectArgs,
} from "../types/graphql";

export const typeDef = gql`
  extend type Query {
    getProject(id: ID!): Project
    getProjects: [Project!]!
  }

  extend type Mutation {
    createProject(input: CreateProjectInput!): Project
    bookmarkProject(projectId: ID!): BookmarkProjectMutationResponse!
    removeBookmarkFromProject(
      projectId: ID!
    ): RemoveBookmarkFromProjectMutationResponse!
  }

  type Project {
    name: String!
    image: String!
    description: String!
    # user: User!
    tag: Tag!
    target: Float!
    amountFunded: Float!
    backers: Int!
    createdAt: Date!
    comments: [Comment!]!
    isBookmarked: Boolean!
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
    tag: Tag!
    target: Float!
  }

  type BookmarkProjectMutationResponse {
    projectId: ID!
    success: Boolean!
  }

  type RemoveBookmarkFromProjectMutationResponse {
    projectId: ID!
    success: Boolean!
  }
`;

export const resolvers = {
  Query: {
    getProject: async (_: any, args: QueryGetProjectArgs) => {
      const projectId = args.id;

      const project = await ProjectService.getById(projectId);

      return project;
    },

    getProjects: async () => {
      const projects = await ProjectService.getProjects();

      return projects;
    },
  },

  Mutation: {
    createProject: async (
      _: any,
      args: MutationCreateProjectArgs,
      context: Context
    ) => {
      AuthService.requireAuth(context.user);

      console.log("creating project");

      const user = context.user!;
      const projectArgs = args.input;

      const project = await ProjectService.create(projectArgs, user);

      return project;
    },

    bookmarkProject: async (
      _: any,
      args: MutationBookmarkProjectArgs,
      context: Context
    ) => {
      AuthService.requireAuth(context.user);

      const uid = context.user?.id!;
      const projectId = args.projectId;

      await ProjectService.bookmarkProject({ uid, projectId });

      return {
        projectId,
        success: true,
      };
    },

    removeBookmarkFromProject: async (
      _: any,
      args: MutationRemoveBookmarkFromProjectArgs,
      context: Context
    ) => {
      AuthService.requireAuth(context.user);

      const uid = context.user?.id!;
      const projectId = args.projectId;

      await ProjectService.removeBookmarkFromProject({ uid, projectId });

      return {
        projectId,
        success: true,
      };
    },
  },

  Project: {
    comments: async (parent: Project) => {
      const projectId = parent.id;

      const comments = await CommentService.getCommentsFromProject(projectId);

      return comments;
    },

    isBookmarked: async (parent: Project, _: any, context: Context) => {
      const uid = context.user?.id || "";
      const projectId = parent.id;

      const isBookmarked = await ProjectService.isBookmarked({
        uid,
        projectId,
      });

      return isBookmarked;
    },
  },
};
