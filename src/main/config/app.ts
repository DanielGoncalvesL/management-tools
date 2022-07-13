import express from 'express';

import { setupMiddlewares } from '@/main/config/middlewares';
import { setupApolloServer } from '@/main/config/apollo-server';
import { setupRoutes } from '@/main/config/routes';

const app = express();

setupMiddlewares(app);

setupRoutes(app);

export { app };
