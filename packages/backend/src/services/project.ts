import { Project, ProjectCollection } from "../models/project";
import { User } from "../models/user";
import * as CollectionHelpers from "../helpers/collection";
import { ApolloError } from "apollo-server-errors";
import { BookmarkService } from "./bookmark";
import { CreateProjectInput, FundProjectInput } from "../types/graphql";
import { UserService } from "./user";
import { stripe } from "../modules/stripe";
import {
  BackedProject,
  BackedProjectCollection,
} from "../models/backedProject";
import { BackedProjectService } from "./backedProject";

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

interface FundProjectArgs extends FundProjectInput {}

interface UpdateFundedProjectArgs {
  projectId: string;
  amount: number;
  backerUid: string;
}

export class ProjectService {
  static stripe = stripe;

  static async create(project: CreateProjectArgs, user: User) {
    console.log("creating project");

    // need to add validation to check if user billing is enabled
    if (!user.billing.chargesEnabled) {
      throw new ApolloError(
        "You need to complete billing onboarding before creating a project",
        "400"
      );
    }

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

  static async getBackedProjects(user: User) {
    // get all backed project docs
    const query = BackedProjectCollection.where("uid", "==", user.id);
    const backedProjectDocs = await query.get().then(CollectionHelpers.data);

    // map over each and get the actual project
    let projectsPromise = backedProjectDocs.map(async (doc) => {
      return (await ProjectService.getById(doc.projectId))!;
    });

    const projects = await Promise.all(projectsPromise);

    return projects;
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

  static async fundProject(args: FundProjectArgs, user: User) {
    const { amount, projectId } = args;

    console.log("funding a project");

    const project = await this.getById(projectId);

    if (!project) {
      throw new ApolloError("Cannot fund a project that does not exist", "400");
    }

    // TODO: check if the project has already been backed
    const projectAlreadyBacked =
      await BackedProjectService.isProjectAlreadyBacked(projectId, user.id);

    if (projectAlreadyBacked) {
      throw new ApolloError("Project already backed", "400");
    }

    const stripeAmount = amount * 100;

    const projectCreator = (await UserService.getByUid(project.uid))!;
    const creatorConnectAccountId = projectCreator?.billing.connectedAccountId;

    const metadata = {
      projectId: project.id,
      backerUid: user.id,
    };

    console.log("meta data");
    console.log(metadata);

    console.log("user");
    console.log(user);

    console.log("project creator");
    console.log(projectCreator);

    console.log("stripe amt");
    console.log(stripeAmount);

    console.log("project");
    console.log(project);

    const customerId = user.billing.customerId;

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: stripeAmount,
      currency: "usd",
      metadata,
      customer: customerId,
      transfer_data: {
        destination: creatorConnectAccountId,
      },
    });

    console.log({ paymentIntent });

    return paymentIntent.client_secret;
  }

  static async updateFundedProject({
    projectId,
    amount,
    backerUid,
  }: UpdateFundedProjectArgs) {
    console.log("[updating funded project]");

    const project = await this.getById(projectId);

    console.log(project);

    if (!project) {
      throw new Error("Project does not exist");
    }

    // fund the project
    project.fundProject(amount);
    console.log(project);

    // create a link b/w the backer and the backed project
    const backedProject = new BackedProject({
      uid: backerUid,
      projectId,
    });

    console.log(backedProject);

    // save the project
    await ProjectCollection.doc(project.id).set(project);

    // save the backed project
    await BackedProjectCollection.doc(backedProject.id).set(backedProject);
  }
}
