"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const serverless_http_1 = __importDefault(require("serverless-http"));
const schema_1 = require("./schema");
const app = express_1.default();
const api = express_1.default();
const apolloServer = new apollo_server_express_1.ApolloServer({ schema: schema_1.schema });
app.use("/.netlify/functions/api", api);
api.get("/", (req, res) => {
    res.send("Hello World!");
});
apolloServer.applyMiddleware({ app: api });
exports.handler = serverless_http_1.default(app);
