import { PgToolRepository } from '@/infra/db/postgres/repositories/tool';

export const makePgToolRepository = (): PgToolRepository => {
  return new PgToolRepository();
};
