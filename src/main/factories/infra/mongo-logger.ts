import { MongoLoggerRepository } from '@/infra/db/mongo/repositories';

export const makeMongoLogger = (): MongoLoggerRepository =>
  new MongoLoggerRepository();
