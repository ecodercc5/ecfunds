import express from "express";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import serverless from "serverless-http";
import { schema } from "./schema";
import { firestore } from "./modules/firebase";

dotenv.config();

const app = express();
const api = express();

const apolloServer = new ApolloServer({ schema });

app.use("/.netlify/functions/api", api);

api.get("/", async (req, res) => {
  const users = await firestore
    .collection("users")
    .get()
    .then((snap) => snap.docs.map((doc) => doc.data()));

  res.json({ data: users });
});

apolloServer.applyMiddleware({ app: api });

export const handler = serverless(app);
