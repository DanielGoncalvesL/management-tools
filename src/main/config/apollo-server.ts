import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';

import { resolvers } from '@/main/graphql/resolvers';
import { typeDefs } from '@/main/graphql/type-defs';

export const setupApolloServer = async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  await server.start();

  server.applyMiddleware({ app });
};
