export class PgConnectionNotFoundError extends Error {
  constructor() {
    super('No connection for postgresql was found');
    this.name = 'PgConnectionNotFoundError';
  }
}
