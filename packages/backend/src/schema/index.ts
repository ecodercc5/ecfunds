import { gql, makeExecutableSchema } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import merge from "lodash.merge";

const Root = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const typeDefs = [Root, User];
const resolvers = merge({}, UserResolvers);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
