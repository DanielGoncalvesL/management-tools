import { PgUserRepository } from '@/infra/repositories/postgres';

export const makePgUserRepository = (): PgUserRepository => {
  return new PgUserRepository();
};
