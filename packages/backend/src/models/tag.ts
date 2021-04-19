import { Model, createCollection, ModelArgs } from "./";

interface TagArgs extends ModelArgs {
  name: string;
}

export class Tag extends Model {
  name: string;

  constructor(args: TagArgs) {
    const { id, name } = args;

    super(id);
    this.name = name;
  }
}

export const TagCollection = createCollection("tags", Tag);
