import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import serverless from "serverless-http";
import { schema } from "./schema";

const app = express();
const api = express();

const apolloServer = new ApolloServer({ schema });

app.use("/.netlify/functions/api", api);

api.get("/", (req, res) => {
  res.send("Hello World!");
});

apolloServer.applyMiddleware({ app: api });

export const handler = serverless(app);
