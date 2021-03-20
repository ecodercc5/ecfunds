import { Model, createCollection, ModelArgs } from "./";

interface UserArgs extends ModelArgs {
  email: string;
  photoURL?: string;
}

export class User extends Model {
  email: string;
  photoURL?: string;

  constructor(args: UserArgs) {
    const { id, email, photoURL } = args;

    super(id);

    this.email = email;
    this.photoURL = photoURL;
  }
}

export const UserCollection = createCollection("users", User);
