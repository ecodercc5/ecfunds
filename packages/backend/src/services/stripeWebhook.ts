import Stripe from "stripe";
import { UserCollection } from "../models/user";
import { UserService } from "./user";

export class StripeWebhookService {
  static async handleAccountUpdated(event: Stripe.Event) {
    console.log("handling account updated event");
    const account = event.data.object as Stripe.Account;

    // get the user with the corresponding account id
    const accountId = account.id;

    console.log({ accountId });

    const user = await UserService.getByConnectedAccountId(accountId);

    // get the chargesEnabled field
    const chargesEnabled = account.charges_enabled;

    console.log({ chargesEnabled });

    // update the chargesEnabled field
    await UserCollection.doc(user.id).update({
      "billing.chargesEnabled": chargesEnabled,
    });
  }
}
