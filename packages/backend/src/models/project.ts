import { Model, createCollection, ModelArgs } from "./";

interface ProjectArgs extends ModelArgs {
  name: string;
  image: string;
  description: string;
  target: number;
  amountFunded?: number;
  backers?: number;
  createdAt?: number;
  uid: string;
}

export class Project extends Model {
  name: string;
  image: string;
  description: string;
  target: number;
  amountFunded: number;
  backers: number;
  createdAt: number;
  uid: string;

  constructor(args: ProjectArgs) {
    const {
      id,
      name,
      image,
      description,
      target,
      amountFunded,
      backers,
      createdAt,
      uid,
    } = args;

    super(id);

    this.name = name;
    this.image = image;
    this.description = description;
    this.target = target;
    this.amountFunded = amountFunded ? amountFunded : 0;
    this.backers = backers ? backers : 0;
    this.createdAt = createdAt ? createdAt : new Date().getTime();
    this.uid = uid;
  }

  fundProject(amount: number) {
    this.amountFunded += amount;
    this.backers++;
  }
}

export const ProjectCollection = createCollection("projects", Project);
