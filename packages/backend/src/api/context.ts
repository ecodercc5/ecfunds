import { ExpressContext } from "apollo-server-express";
import { User } from "../models/user";
import { AuthService } from "../services/auth";

export interface Context extends ExpressContext {
  user?: User | null;
}

export class ApolloServerExpressContextAPI {
  static async createContext(defaultContext: ExpressContext) {
    let context: Context = { ...defaultContext };

    const authHeader = context.req.header("authorization") || "";

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      return context;
    }

    const user = await AuthService.verifyToken(token);

    context.user = user;

    return context;
  }
}
