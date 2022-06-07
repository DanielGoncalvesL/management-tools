import { PgUserRepository } from '@/infra/db/postgres/repositories';

export const makePgUserRepository = (): PgUserRepository => {
  return new PgUserRepository();
};
