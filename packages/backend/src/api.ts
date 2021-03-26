import express from "express";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import serverless from "serverless-http";
import { schema } from "./schema";
import { ApolloServerExpressContextAPI } from "./api/context";

dotenv.config();

const app = express();
const api = express();

const apolloServer = new ApolloServer({
  schema,
  context: (_context) => {
    return ApolloServerExpressContextAPI.createContext(_context);
  },
});

app.use("/.netlify/functions/api", api);

apolloServer.applyMiddleware({ app: api });

export const handler = serverless(app);
