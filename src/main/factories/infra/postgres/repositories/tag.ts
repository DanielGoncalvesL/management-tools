import { PgTagRepository } from '@/infra/db/postgres/repositories/tag';

export const makePgTagRepository = (): PgTagRepository => {
  return new PgTagRepository();
};
