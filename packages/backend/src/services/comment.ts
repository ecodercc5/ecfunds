import { ApolloError } from "apollo-server-errors";
import { User } from "../models/user";
import { Comment, CommentCollection } from "../models/comment";
import { AddCommentToProjectInput } from "../types/graphql";
import { ProjectService } from "./project";

interface AddCommentToProjectArgs {
  user: User;
  comment: AddCommentToProjectInput;
}

export class CommentService {
  static async addCommentToProject({ user, comment }: AddCommentToProjectArgs) {
    const { projectId, content } = comment;

    // check if project exists
    const project = await ProjectService.getById(projectId);

    if (!project) {
      throw new ApolloError("Project does not exist", "400");
    }

    // create new comment
    const newComment = new Comment({
      content,
      user: {
        name: user.name!,
        photoUrl: user.photoURL,
        id: user.id,
      },
      projectId,
    });

    // save comment to db
    await CommentCollection.doc(newComment.id).set(newComment);

    return newComment;
  }
}
