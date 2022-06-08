import {
  createConnection,
  getConnection,
  getConnectionManager,
  ObjectType,
  QueryRunner,
  Repository,
  Connection,
  getRepository,
} from 'typeorm';
import {
  PgConnectionNotFoundError,
  PgTransactionNotFoundError,
} from '@/infra/db/postgres/helpers';
import { DbTransaction } from '@/application/contracts';

export class PgConnection implements DbTransaction {
  private static instance?: PgConnection;

  private query?: QueryRunner;

  private connection?: Connection;

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined) {
      PgConnection.instance = new PgConnection();
    }

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

    this.query = undefined;
    this.connection = undefined;
  }

  async openTransaction(): Promise<void> {
    if (this.connection === undefined) {
      throw new PgConnectionNotFoundError();
    }

    this.query = this.connection.createQueryRunner();

    await this.query.startTransaction();
  }

  async closeTransaction(): Promise<void> {
    if (this.query === undefined) {
      throw new PgTransactionNotFoundError();
    }

    await this.query.release();

    this.query = undefined;
  }

  async commit(): Promise<void> {
    if (this.query === undefined) {
      throw new PgTransactionNotFoundError();
    }

    await this.query.commitTransaction();
  }

  async rollback(): Promise<void> {
    if (this.query === undefined) {
      throw new PgTransactionNotFoundError();
    }

    await this.query.rollbackTransaction();
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) {
      throw new PgConnectionNotFoundError();
    }

    if (this.query !== undefined) {
      return this.query.manager.getRepository(entity);
    }

    return getRepository(entity);
  }
}
