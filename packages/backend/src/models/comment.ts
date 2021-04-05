import { Model, createCollection, ModelArgs } from "./";

interface CommentArgs extends ModelArgs {
  content: string;
  projectId: string;
  user: CommentUserDetails;
  createdAt?: number;
}

interface CommentUserDetails {
  name: string;
  photoUrl?: string;
  id: string;
}

export class Comment extends Model {
  content: string;
  projectId: string;
  user: CommentUserDetails;
  createdAt: number;

  constructor(args: CommentArgs) {
    const { id, content, projectId, user, createdAt } = args;

    super(id);
    this.content = content;
    this.projectId = projectId;
    this.user = user;
    this.createdAt = createdAt ? createdAt : new Date().getTime();
  }
}

export const CommentCollection = createCollection("comments", Comment);
