import { gql, makeExecutableSchema } from "apollo-server-express";
import { typeDef as User, resolvers as UserResolvers } from "./user";
import { typeDef as Project, resolvers as ProjectResolvers } from "./project";
import { typeDef as Comment, resolvers as CommentResolvers } from "./comment";
import { typeDef as Date, resolvers as DateResolvers } from "./scalars/date";
import merge from "lodash.merge";

const Root = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const typeDefs = [Root, User, Project, Comment, Date];
const resolvers = merge(
  {
    Query: {
      _: () => {
        console.log(process.env);
      },
    },
  },
  UserResolvers,
  ProjectResolvers,
  CommentResolvers,
  DateResolvers
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
