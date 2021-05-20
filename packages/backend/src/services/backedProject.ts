import { BackedProjectCollection } from "../models/backedProject";

export class BackedProjectService {
  static async isProjectAlreadyBacked(projectId: string, uid: string) {
    const query = BackedProjectCollection.where(
      "projectId",
      "==",
      projectId
    ).where("uid", "==", uid);
    const exists = await query.get().then((snap) => !snap.empty);

    return exists;
  }
}
