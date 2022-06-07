import { Controller } from '@/application/controllers';
import { DbTransactionController } from '@/application/decorators';
import { Logger } from '@/domain/contracts/providers';
import { makePgConnection } from '@/main/factories/infra/postgres/helpers';

export const makePgTransactionController = (
  controller: Controller,
  logger: Logger,
): DbTransactionController => {
  return new DbTransactionController(controller, makePgConnection(), logger);
};
