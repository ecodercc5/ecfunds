import { gql } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
});

export const typeDef = gql`
  scalar Date
`;

export const resolvers = {
  Date: dateScalar,
};
