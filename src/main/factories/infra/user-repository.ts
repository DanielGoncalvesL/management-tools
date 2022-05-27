import { PgUserRepository } from '@/infra/db/repositories/postgres';

export const makePgUserRepository = (): PgUserRepository =>
  new PgUserRepository();
