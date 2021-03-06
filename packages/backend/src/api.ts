import express from "express";
import serverless from "serverless-http";

const app = express();
const api = express();

app.use("/.netlify/functions/api", api);

api.get("/", (req, res) => {
  res.send("Hello World!");
});

export const handler = serverless(app);
