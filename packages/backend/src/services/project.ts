import { Project, ProjectCollection } from "../models/project";
import { User } from "../models/user";
import * as CollectionHelpers from "../helpers/collection";

interface CreateProjectArgs {
  name: string;
  image: string;
  description: string;
}

export class ProjectService {
  static async create(project: CreateProjectArgs, user: User) {
    console.log("creating project");

    // need to add validation to check if user billing is enabled

    // create new project
    const newProject = new Project({ ...project, uid: user.id });

    // save to db
    await ProjectCollection.doc(newProject.id).set(newProject);

    return newProject;
  }

  static getById(id: string) {
    return ProjectCollection.doc(id)
      .get()
      .then((doc) => doc.data());
  }

  static getProjects() {
    return ProjectCollection.get().then(CollectionHelpers.data);
  }
}
