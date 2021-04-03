import { User } from "../models/user";
import { admin } from "../modules/firebase";
import { UserService } from "./user";
import { AuthenticationError } from "apollo-server-express";

export class AuthService {
  static requireAuth(user: User | undefined) {
    if (!user) {
      throw new AuthenticationError(
        "You need to be authenticated to perform this request"
      );
    }
  }

  static async decodeToken(token: string) {
    const decodedToken = await admin.auth().verifyIdToken(token);

    return decodedToken;
  }

  static async verifyToken(token: string) {
    try {
      const decodedToken = await AuthService.decodeToken(token);

      // get the uid of user
      const uid = decodedToken.uid;

      // get the user by uid
      const user = await UserService.getByUid(uid);

      return user;
    } catch (err) {
      return undefined;
    }
  }

  static getAuthorizationToken(authorization: string) {
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      throw new Error("Token needs to be of type Bearer");
    }

    return token;
  }
}
