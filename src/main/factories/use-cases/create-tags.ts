import { CreateTags, setupCreateTags } from '@/domain/use-cases';
import { makePgTagRepository } from '@/main/factories/infra/postgres/repositories';

export const makeCreateTags = (): CreateTags => {
  return setupCreateTags(makePgTagRepository());
};
