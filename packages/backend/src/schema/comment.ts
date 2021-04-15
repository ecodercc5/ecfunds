import { gql } from "apollo-server-express";
import { Context } from "../api/context";
import { AuthService } from "../services/auth";
import { CommentService } from "../services/comment";
import { ProjectService } from "../services/project";
import { MutationAddCommentToProjectArgs } from "../types/graphql";

export const typeDef = gql`
  extend type Mutation {
    addCommentToProject(input: AddCommentToProjectInput!): Comment
  }

  type Comment {
    content: String!
    user: CommentUserDetails!
    createdAt: Date!
    projectId: ID!
    id: ID!
  }

  type CommentUserDetails {
    name: String!
    photoUrl: String
    id: ID!
  }

  input AddCommentToProjectInput {
    projectId: ID!
    content: String!
  }
`;

export const resolvers = {
  Mutation: {
    addCommentToProject: async (
      _: any,
      args: MutationAddCommentToProjectArgs,
      context: Context
    ) => {
      console.log("adding comment to project");

      AuthService.requireAuth(context.user);
      const user = context.user!;

      const addedComment = await CommentService.addCommentToProject({
        user,
        comment: args.input,
      });

      return addedComment;
    },
  },
};
