import { gql } from "apollo-server-express";
import { TagService } from "../../services/tag";

export const typeDef = gql`
  extend type Query {
    getTags: [Tag]!
  }

  enum Tag {
    TECH
    ART
    CLOTHING
    FOOD
    FILM
  }
`;

export const resolvers = {
  Query: {
    getTags: () => {
      return TagService.getAll().then((tags) => tags.map((tag) => tag.name));
    },
  },

  Tag: {
    TECH: "Tech",
    ART: "Art",
    CLOTHING: "Clothing",
    FOOD: "Food",
    FILM: "Film",
  },
};
