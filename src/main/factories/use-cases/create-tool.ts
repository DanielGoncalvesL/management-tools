import { CreateTool, setupCreateTool } from '@/domain/use-cases';
import { makePgToolRepository } from '@/main/factories/infra/postgres/repositories';

export const makeCreateTool = (): CreateTool => {
  return setupCreateTool(makePgToolRepository());
};
