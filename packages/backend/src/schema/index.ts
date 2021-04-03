import { gql, makeExecutableSchema } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import { typeDef as Project, resolvers as ProjectResolvers } from "./project";
import merge from "lodash.merge";

const Root = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const typeDefs = [Root, User, Project];
const resolvers = merge({}, UserResolvers, ProjectResolvers);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
