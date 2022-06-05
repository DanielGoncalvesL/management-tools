import { MongoHelper } from '@/infra/db/mongo/helpers';
import { PgConnection } from '@/infra/db/postgres/helpers/connection';
import { env } from '@/main/config/env';
import { getConnection } from 'typeorm';

export const connectDbs = async () => {
  await Promise.all([
    MongoHelper.getInstance().connect(env.mongoUrl),
    PgConnection.getInstance()
      .connect()
      .then(async () => {
        await getConnection().synchronize();
      }),
  ]);
};
