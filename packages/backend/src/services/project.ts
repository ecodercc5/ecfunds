import { Project, ProjectCollection } from "../models/project";
import { User } from "../models/user";
import * as CollectionHelpers from "../helpers/collection";
import { ApolloError } from "apollo-server-errors";
import { BookmarkService } from "./bookmark";
import { CreateProjectInput } from "../types/graphql";

interface CreateProjectArgs extends CreateProjectInput {}

interface BookmarkProjectArgs {
  uid: string;
  projectId: string;
}

interface RemoveBookmarkFromProjectArgs {
  uid: string;
  projectId: string;
}

interface IsBookmarkedArgs {
  uid: string;
  projectId: string;
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

  static async bookmarkProject(args: BookmarkProjectArgs) {
    const { uid, projectId } = args;

    // check if bookmark exists
    const existingBookmark = await BookmarkService.getByUidAndProjectId({
      uid,
      projectId,
    });

    if (existingBookmark) {
      throw new ApolloError("Project already bookmarked");
    }

    // check if the project exists
    const project = await ProjectService.getById(projectId);

    if (!project) {
      throw new ApolloError("Project does not exist", "400");
    }

    // create and save a bookmark
    const bookmark = await BookmarkService.create({ uid, projectId });

    return bookmark;
  }

  static removeBookmarkFromProject({
    uid,
    projectId,
  }: RemoveBookmarkFromProjectArgs) {
    return BookmarkService.removeBookmark({
      uid,
      projectId,
    });
  }

  static async isBookmarked({ uid, projectId }: IsBookmarkedArgs) {
    const bookmark = await BookmarkService.getByUidAndProjectId({
      uid,
      projectId,
    });

    return bookmark ? true : false;
  }
}
