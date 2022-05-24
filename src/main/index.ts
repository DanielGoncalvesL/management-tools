/* eslint-disable no-console */
import 'dotenv/config';

import './config/module-alias';
import { env } from '@/main/config/env';

import 'reflect-metadata';
import { makeWinstonAdapter } from '@/main/factories/infra';
import { connectDbs } from '@/main/config/connect-dbs';

const logger = makeWinstonAdapter();

connectDbs()
  .then(async () => {
    const { app } = await import('@/main/config/app');

    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    );
  })
  .catch(error => {
    console.error(error);

    logger.logging({ paramToLogger: error as Error });
  });
