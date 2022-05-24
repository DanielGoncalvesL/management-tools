import { SignUpUserController } from '@/application/controllers';
import { makeMongoLogger } from '@/main/factories/infra/mongo-logger';
import { makeSignUpUserService } from '@/main/factories/services';

export const makeSignUpUserController = (): SignUpUserController => {
  const mongoLogger = makeMongoLogger();

  const signUpUserService = makeSignUpUserService();

  return new SignUpUserController(mongoLogger, signUpUserService);
};
