import { urlResolver } from "../url/url.resolver.js";

export const resolvers = {
  Query: {
    ...urlResolver.Query,
  },
  Mutation: {
    ...urlResolver.Mutation,
  },
};
