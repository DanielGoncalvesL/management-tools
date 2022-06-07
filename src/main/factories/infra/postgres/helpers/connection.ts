import { PgConnection } from '@/infra/db/postgres/helpers';

export const makePgConnection = (): PgConnection => {
  return PgConnection.getInstance();
};
