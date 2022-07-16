import { PgConnectionNotFoundError } from '@/infra/db/postgres/helpers';

describe('PgConnectionError', () => {
  it('should be able to return correct name and message', () => {
    const error = new PgConnectionNotFoundError();

    expect(error.name).toBe('PgConnectionNotFoundError');
    expect(error.message).toBe('No connection for postgresql was found');
  });
});
