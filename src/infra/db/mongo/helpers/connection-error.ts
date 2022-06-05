export class MongoConnectionNotFoundError extends Error {
  constructor() {
    super('No connection for mongodb was found');
    this.name = 'MongoConnectionNotFoundError';
  }
}
