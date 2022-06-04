import { SignUpUserController } from '@/application/controllers';
import { makeMongoLogger } from '@/main/factories/infra/mongo-logger';
import { makeSignUpUser } from '@/main/factories/use-cases';

export const makeSignUpUserController = (): SignUpUserController => {
  const mongoLogger = makeMongoLogger();

  const signUpUser = makeSignUpUser();

  return new SignUpUserController(mongoLogger, signUpUser);
};
