import { PgConnectionNotFoundError } from '@/infra/db/repositories/postgres/helpers/connection-error';
import {
  createConnection,
  getConnection,
  getConnectionManager,
  Connection,
} from 'typeorm';

export class PgConnection {
  private static instance?: PgConnection;

  private connection?: Connection;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined)
      PgConnection.instance = new PgConnection();
    return PgConnection.instance;
  }

  async connect(): Promise<void> {
    this.connection = getConnectionManager().has('default')
      ? getConnection()
      : await createConnection();
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined) {
      throw new PgConnectionNotFoundError();
    }

    await getConnection().close();
    this.connection = undefined;
  }
}
