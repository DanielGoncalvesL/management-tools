import { json, Express } from 'express';
import cors from 'cors';

export const setupMiddlewares = (app: Express): void => {
  app.use(cors());

  app.use(json());

  app.use((request, response, next) => {
    response.type('json');

    next();
  });
};
