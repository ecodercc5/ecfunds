import { ApolloError } from "apollo-server-errors";
import { User, UserCollection } from "../models/user";
import { auth } from "../modules/firebase";

export class UserService {
  static async signIn(uid: string) {
    console.log("signing in user");

    // check if user is already signed up
    const prevUser = await UserService.get(uid);

    console.log({ prevUser });

    // if user already exists return the user
    if (prevUser) return prevUser;

    // signup user
    const newUser = await UserService.signUp(uid);

    return newUser;
  }

  static async get(uid: string) {
    return UserCollection.doc(uid)
      .get()
      .then((doc) => doc.data());
  }

  static async signUp(uid: string) {
    console.log("signing up user");

    // check if the user record exists in firebase auth
    const user = await auth.getUser(uid).catch(() => null);

    if (!user) {
      throw new ApolloError("Invalid uid");
    }

    // create new user document
    const { email, photoURL } = user;

    const newUser = new User({
      email: email!,
      photoURL,
      id: uid,
    });

    // save user to firestore
    await UserCollection.doc(uid).set(newUser);

    return newUser;
  }
}
