import { admin } from "../modules/firebase";
import { UserService } from "./user";

export class AuthService {
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
      return null;
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
