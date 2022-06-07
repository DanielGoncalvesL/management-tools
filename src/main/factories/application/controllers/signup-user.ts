import { Controller, SignUpUserController } from '@/application/controllers';
import { makePgTransactionController } from '@/main/factories/application/decorators/db-transaction-controller';
import { makeMongoLogger } from '@/main/factories/infra/mongo/repositories/mongo-logger';
import { makeSignUpUser } from '@/main/factories/use-cases';

export const makeSignUpUserController = (): Controller => {
  const mongoLogger = makeMongoLogger();

  const signUpUser = makeSignUpUser();

  const controller = new SignUpUserController(mongoLogger, signUpUser);

  return makePgTransactionController(controller, mongoLogger);
};
