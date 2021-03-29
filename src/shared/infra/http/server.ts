import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import morgan from 'morgan'

import swaggerUi from 'swagger-ui-express';

import '@shared/infra/typeorm';

import '@shared/container';

import routes from '@shared/infra/http/routes';

import AppError from '@shared/errors/AppError';

import { isCelebrateError } from 'celebrate';

import swaggerFile from './swagger.json';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(morgan('dev'))

app.use(routes);

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    const { statusCode } = error;

    return response.status(statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (isCelebrateError(error)) {
    const values = error.details.values();
    let { message } = values.next().value.details[0];
    message = message.replace('"', '').replace('"', '');

    return response.status(400).json({
      status: 'error',
      type: 'validation',
      message,
    });
  }

  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('\n🚀 Server started on port 3000!\n Open http://localhost:3000/docs-api to read the documentation.\n');
  });
}

export default app;
