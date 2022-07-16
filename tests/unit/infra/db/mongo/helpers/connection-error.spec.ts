import { MongoConnectionNotFoundError } from '@/infra/db/mongo/helpers';

describe('MongoConnectionNotFoundError', () => {
  it('should be able to return correct name and message', () => {
    const error = new MongoConnectionNotFoundError();

    expect(error.name).toBe('MongoConnectionNotFoundError');
    expect(error.message).toBe('No connection for mongodb was found');
  });
});
