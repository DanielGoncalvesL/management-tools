import { MongoHelper } from '@/infra/db/repositories/mongo/helpers';
import { PgConnection } from '@/infra/db/repositories/postgres/helpers/connection';
import { env } from '@/main/config/env';
import { getConnection } from 'typeorm';

export const connectDbs = async () => {
  await Promise.allSettled([
    MongoHelper.getInstance().connect(env.mongoUrl),
    PgConnection.getInstance()
      .connect()
      .then(async () => {
        await getConnection().synchronize();
      }),
  ]);
};
