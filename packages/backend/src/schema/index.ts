import { gql, makeExecutableSchema } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import { typeDef as Project, resolvers as ProjectResolvers } from "./project";
import { typeDef as Comment, resolvers as CommentResolvers } from "./comment";
import merge from "lodash.merge";

const Root = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const typeDefs = [Root, User, Project, Comment];
const resolvers = merge({}, UserResolvers, ProjectResolvers, CommentResolvers);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
