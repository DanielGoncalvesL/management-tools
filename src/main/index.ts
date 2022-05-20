import './config/module-alias';
import { env } from '@/main/config/env';

import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';
import { makeWinstonAdapter } from '@/main/factories/infra';

const logger = makeWinstonAdapter();

console.log(env.nodeEnv);

createConnection()
  .then(async () => {
    await getConnection().synchronize();

    const { app } = await import('@/main/config/app');

    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    );
  })
  .catch(error => {
    logger.logging({ paramToLogger: error as Error });
  });
