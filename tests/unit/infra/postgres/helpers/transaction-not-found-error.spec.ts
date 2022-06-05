import { PgTransactionNotFoundError } from '@/infra/db/postgres/helpers';

describe('PgTransactionNotFoundError', () => {
  it('should be able to return correct name and message', () => {
    const error = new PgTransactionNotFoundError();

    expect(error.name).toBe('PgTransactionNotFoundError');
    expect(error.message).toBe('No postgresql transaction was found');
  });
});
