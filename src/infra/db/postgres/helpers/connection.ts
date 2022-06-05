import { PgConnectionNotFoundError } from '@/infra/db/postgres/helpers/connection-error';
import {
  createConnection,
  getConnection,
  getConnectionManager,
  Connection,
} from 'typeorm';

export class PgConnection {
  private static instance?: PgConnection;

  private connection?: Connection;

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
