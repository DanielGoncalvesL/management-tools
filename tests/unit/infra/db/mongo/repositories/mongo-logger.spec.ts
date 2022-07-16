import { Collection } from 'mongodb';
import { MongoLoggerRepository } from '@/infra/db/mongo/repositories';
import { MongoHelper } from '@/infra/db/mongo/helpers';
import { env } from '@/main/config/env';

describe('LogMongoRepository', () => {
  let sut: MongoLoggerRepository;
  let logCollection: Collection;
  let log: any;

  beforeAll(async () => {
    await MongoHelper.getInstance().connect(env.mongoUrl);

    logCollection = await MongoHelper.getInstance().getCollection('logs');
  });

  afterAll(async () => {
    await MongoHelper.getInstance().disconnect();
  });

  beforeEach(async () => {
    sut = new MongoLoggerRepository();

    await logCollection.deleteMany({});
  });

  it('Should create an log on success', async () => {
    await sut.logging({ paramToLogger: 'any_param' });

    const count = await logCollection.countDocuments();

    expect(count).toBe(1);

    await logCollection.find().forEach(logObject => {
      log = logObject;
    });

    expect(log).toHaveProperty('_id');
    expect(log).toHaveProperty('data', 'any_param');
    expect(log).toHaveProperty('date');
  });

  it('Should create an error log on success', async () => {
    await sut.logging({ paramToLogger: new Error('any_error') });

    const count = await logCollection.countDocuments();

    expect(count).toBe(1);

    await logCollection.find().forEach(logObject => {
      log = logObject;
    });

    expect(log).toHaveProperty('_id');
    expect(log).toHaveProperty('stack');
    expect(log).toHaveProperty('name', 'Error');
    expect(log).toHaveProperty('message', 'any_error');
    expect(log).toHaveProperty('cause', null);
    expect(log).toHaveProperty('date');
  });
});
