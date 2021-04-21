import { BookmarkCollection, Bookmark, BookmarkArgs } from "../models/bookmark";
import * as CollectionHelpers from "../helpers/collection";
import { ApolloError } from "apollo-server-errors";

interface CreateBookmarkArgs extends BookmarkArgs {}

interface GetByUidAndProjectIdArgs {
  uid: string;
  projectId: string;
}

interface RemoveBookmarkArgs {
  uid: string;
  projectId: string;
}

export class BookmarkService {
  static async create({ uid, projectId }: CreateBookmarkArgs) {
    const bookmark = new Bookmark({ uid, projectId });

    await BookmarkCollection.doc(bookmark.id).set(bookmark);

    return bookmark;
  }

  static getByUidAndProjectId({ uid, projectId }: GetByUidAndProjectIdArgs) {
    return BookmarkCollection.where("uid", "==", uid)
      .where("projectId", "==", projectId)
      .get()
      .then(CollectionHelpers.data)
      .then((bookmarks) => bookmarks[0]);
  }

  static async removeBookmark({ uid, projectId }: RemoveBookmarkArgs) {
    const bookmark = await this.getByUidAndProjectId({
      uid,
      projectId,
    });

    if (!bookmark) {
      throw new ApolloError(
        "Cannot remmove a bookmark that does not exist",
        "400"
      );
    }

    await BookmarkCollection.doc(bookmark.id).delete();
  }
}
