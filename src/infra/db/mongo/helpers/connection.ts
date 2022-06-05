import { MongoClient, Collection } from 'mongodb';
import { MongoConnectionNotFoundError } from '@/infra/db/mongo/helpers/connection-error';

export class MongoHelper {
  private static instance?: MongoHelper;

  private connection?: MongoClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  getConnection(): MongoClient | undefined {
    return this.connection;
  }

  static getInstance(): MongoHelper {
    if (MongoHelper.instance === undefined)
      MongoHelper.instance = new MongoHelper();
    return MongoHelper.instance;
  }

  async connect(uri: string): Promise<void> {
    this.connection = await MongoClient.connect(uri);
  }

  async disconnect(): Promise<void> {
    if (this.connection !== undefined) {
      await this.connection.close();
      this.connection = undefined;
    }
  }

  async getCollection(name: string): Promise<Collection> {
    if (this.connection) {
      return this.connection.db().collection(name);
    }

    throw new MongoConnectionNotFoundError();
  }
}
