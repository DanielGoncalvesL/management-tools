export class PgTransactionNotFoundError extends Error {
  constructor() {
    super('No postgresql transaction was found');
    this.name = 'PgTransactionNotFoundError';
  }
}
