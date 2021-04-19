import { TagCollection } from "../models/tag";
import * as CollectionHelpers from "../helpers/collection";

export class TagService {
  static async getAll() {
    return TagCollection.get().then(CollectionHelpers.data);
  }
}
