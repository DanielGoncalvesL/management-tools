import { MongoLoggerRepository } from '@/infra/db/repositories/mongo';

export const makeMongoLogger = (): MongoLoggerRepository =>
  new MongoLoggerRepository();
