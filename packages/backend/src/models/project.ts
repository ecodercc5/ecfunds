import { Model, createCollection, ModelArgs } from "./";

interface ProjectArgs extends ModelArgs {
  name: string;
  image: string;
  description: string;
  uid: string;
}

export class Project extends Model {
  name: string;
  image: string;
  description: string;
  createdAt: number;
  uid: string;

  constructor(args: ProjectArgs) {
    const { id, name, image, description, uid } = args;

    super(id);

    this.name = name;
    this.image = image;
    this.description = description;
    this.createdAt = new Date().getTime();
    this.uid = uid;
  }
}

export const ProjectCollection = createCollection("projects", Project);
