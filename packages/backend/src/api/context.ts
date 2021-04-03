import { ExpressContext } from "apollo-server-express";
import { User } from "../models/user";
import { AuthService } from "../services/auth";

export interface Context extends ExpressContext {
  user: User | undefined;
}

export class ApolloServerExpressContextAPI {
  static async createContext(defaultContext: ExpressContext) {
    let context: Context = { ...defaultContext, user: undefined };

    const authorization = context.req.header("authorization") || "";

    try {
      const token = AuthService.getAuthorizationToken(authorization);

      const user = await AuthService.verifyToken(token);

      context.user = user;
    } catch {}

    return context;
  }
}
