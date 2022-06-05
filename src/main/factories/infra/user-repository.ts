import { PgUserRepository } from '@/infra/db/postgres/repositories';

export const makePgUserRepository = (): PgUserRepository =>
  new PgUserRepository();
