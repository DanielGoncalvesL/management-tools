import { CreateToolController, Controller } from '@/application/controllers';
import { DbTransactionController } from '@/application/decorators';
import { makeMongoLogger } from '@/main/factories/infra/mongo/repositories/mongo-logger';
import { makePgConnection } from '@/main/factories/infra/postgres/helpers';
import { makeCreateTags } from '@/main/factories/use-cases';
import { makeCreateTool } from '@/main/factories/use-cases/create-tool';

export const makeCreateToolController = (): Controller => {
  const mongoLogger = makeMongoLogger();

  const createTags = makeCreateTags();

  const createTool = makeCreateTool();

  const createController = new CreateToolController(
    mongoLogger,
    createTags,
    createTool,
  );

  return new DbTransactionController(
    createController,
    makePgConnection(),
    mongoLogger,
  );
};
