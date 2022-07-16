import {
  MongoConnectionNotFoundError,
  MongoHelper,
} from '@/infra/db/mongo/helpers';
import { env } from '@/main/config/env';
import { Collection, MongoClient } from 'mongodb';

describe('MongoLoggerRepository', () => {
  afterEach(async () => {
    await MongoHelper.getInstance().disconnect();
  });

  it('should get instance', async () => {
    const sut = MongoHelper.getInstance();

    expect(sut).toBeInstanceOf(MongoHelper);
  });

  it('should connection', async () => {
    const connectionSpy = jest.spyOn(MongoClient, 'connect');

    await expect(
      MongoHelper.getInstance().connect(env.mongoUrl),
    ).resolves.toBeUndefined();

    expect(connectionSpy).toHaveBeenCalledTimes(1);
    expect(connectionSpy).toHaveBeenCalledWith(env.mongoUrl);
  });

  it('should disconnect', async () => {
    await MongoHelper.getInstance().connect(env.mongoUrl);

    const closeSpy = jest.spyOn(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      MongoHelper.getInstance().getConnection()!,
      'close',
    );

    await expect(
      MongoHelper.getInstance().disconnect(),
    ).resolves.toBeUndefined();

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(MongoHelper.getInstance().getConnection()).toBeUndefined();
  });

  it('should getCollection', async () => {
    await MongoHelper.getInstance().connect(env.mongoUrl);

    const anyCollection = await MongoHelper.getInstance().getCollection(
      'any_collection',
    );

    expect(anyCollection).toBeInstanceOf(Collection);
    expect(anyCollection.namespace).toBe('test.any_collection');
  });

  it('should getCollection throw error if connection is undefined', async () => {
    const promise = MongoHelper.getInstance().getCollection('any_collection');

    await expect(promise).rejects.toThrow(new MongoConnectionNotFoundError());
  });
});
