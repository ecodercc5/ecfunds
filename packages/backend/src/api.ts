import express from "express";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import serverless from "serverless-http";
import { schema } from "./schema";
import { ApolloServerExpressContextAPI } from "./api/context";
import { router as webhookRoutes } from "./routes/webhooks";
import cors from "cors";

dotenv.config();

const app = express();
const api = express();

app.use(cors());

const apolloServer = new ApolloServer({
  schema,
  context: (_context) => {
    return ApolloServerExpressContextAPI.createContext(_context);
  },
});

app.use("/.netlify/functions/api", api);

api.use("/webhooks", webhookRoutes);

apolloServer.applyMiddleware({ app: api });

export const handler = serverless(app);
