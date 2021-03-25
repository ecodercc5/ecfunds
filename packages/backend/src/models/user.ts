import { Model, createCollection, ModelArgs } from "./";

interface UserArgs extends ModelArgs {
  name?: string;
  email: string;
  photoURL?: string;
  billing: BillingDetails;
}

interface BillingDetails {
  customerId: string;
  connectedAccountId: string;
  chargesEnabled: boolean;
}

export class User extends Model {
  name?: string;
  email: string;
  photoURL?: string;
  billing: BillingDetails;

  constructor(args: UserArgs) {
    const { id, name, email, photoURL, billing } = args;

    super(id);
    this.name = name;
    this.email = email;
    this.photoURL = photoURL;
    this.billing = billing;
  }
}

export const UserCollection = createCollection("users", User);
