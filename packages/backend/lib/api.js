"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app = express_1.default();
const api = express_1.default();
app.use("/.netlify/functions/api", api);
api.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.handler = serverless_http_1.default(app);
