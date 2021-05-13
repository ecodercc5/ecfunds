import { Model, createCollection, ModelArgs } from "./";

export interface BackedProjectArgs extends ModelArgs {
  uid: string;
  projectId: string;
}

export class BackedProject extends Model {
  uid: string;
  projectId: string;

  constructor(args: BackedProjectArgs) {
    const { id, uid, projectId } = args;

    super(id);
    this.uid = uid;
    this.projectId = projectId;
  }
}

export const BackedProjectCollection = createCollection(
  "backed_projects",
  BackedProject
);
