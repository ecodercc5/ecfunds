import { ApolloError } from "apollo-server-errors";
import { User, UserCollection } from "../models/user";
import { auth } from "../modules/firebase";
import { stripe } from "../modules/stripe";

export class UserService {
  private static stripe = stripe;

  static async signIn(uid: string) {
    console.log("signing in user");

    // check if user is already signed up
    const prevUser = await UserService.getByUid(uid);

    console.log({ prevUser });

    // if user already exists return the user
    if (prevUser) return prevUser;

    // signup user
    const newUser = await UserService.signUp(uid);

    return newUser;
  }

  static async getByUid(uid: string) {
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
    const { displayName: name, email, photoURL } = user;

    // create stripe customer & connected account
    const customer = await stripe.customers.create({
      email,
      metadata: { firebaseUid: uid },
    });

    const connectedAccount = await stripe.accounts.create({ type: "express" });

    // add stripe billing details on user
    const customerId = customer.id;
    const {
      id: connectedAccountId,
      charges_enabled: chargesEnabled,
    } = connectedAccount;

    const newUser = new User({
      name,
      email: email!,
      photoURL,
      id: uid,
      billing: {
        customerId,
        connectedAccountId,
        chargesEnabled,
      },
    });

    console.log(newUser);

    // save user to firestore
    await UserCollection.doc(uid).set(newUser);

    return newUser;
  }

  static async createBillingOnboardingLink(user: User) {
    const {
      billing: { connectedAccountId },
    } = user;

    const accountLink = await UserService.stripe.accountLinks.create({
      account: connectedAccountId,
      return_url: "http://localhost:3000/return",
      refresh_url: "http://localhost:3000/refresh",
      type: "account_onboarding",
    });

    return accountLink.url;
  }
}
