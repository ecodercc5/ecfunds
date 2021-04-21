import { Model, createCollection, ModelArgs } from "./";

export interface BookmarkArgs extends ModelArgs {
  uid: string;
  projectId: string;
}

export class Bookmark extends Model {
  uid: string;
  projectId: string;

  constructor(args: BookmarkArgs) {
    const { id, uid, projectId } = args;

    super(id);
    this.uid = uid;
    this.projectId = projectId;
  }
}

export const BookmarkCollection = createCollection("bookmarks", Bookmark);
