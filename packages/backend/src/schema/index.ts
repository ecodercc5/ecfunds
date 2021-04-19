import { gql, makeExecutableSchema } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import { typeDef as Project, resolvers as ProjectResolvers } from "./project";
import { typeDef as Comment, resolvers as CommentResolvers } from "./comment";
import { typeDef as Date, resolvers as DateResolvers } from "./scalars/date";
import { typeDef as Tag, resolvers as TagResolvers } from "./enums/tags";
import merge from "lodash.merge";

const Root = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const typeDefs = [Root, User, Project, Comment, Date, Tag];
const resolvers = merge(
  {},
  UserResolvers,
  ProjectResolvers,
  CommentResolvers,
  DateResolvers,
  TagResolvers
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
