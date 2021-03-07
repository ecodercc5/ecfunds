import { gql, makeExecutableSchema } from "apollo-server-express";

const Root = gql`
  type Query {
    _: Boolean
  }
`;

const typeDefs = [Root];
const resolvers = {};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
