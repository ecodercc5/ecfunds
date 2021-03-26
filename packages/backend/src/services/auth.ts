import { admin } from "../modules/firebase";
import { UserService } from "./user";

export class AuthService {
  static async verifyToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      // get the uid of user
      const uid = decodedToken.uid;

      // get the user by uid
      const user = await UserService.getByUid(uid);

      return user;
    } catch (err) {
      return null;
    }
  }
}
