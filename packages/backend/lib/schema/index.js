"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const Root = apollo_server_express_1.gql `
  type Query {
    _: Boolean
  }
`;
const typeDefs = [Root];
const resolvers = {};
exports.schema = apollo_server_express_1.makeExecutableSchema({ typeDefs, resolvers });
