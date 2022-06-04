import { SignUpUserController } from '@/application/controllers';
import { makeMongoLogger } from '@/main/factories/infra/mongo-logger';
import { makeSignUpUserUseCase } from '@/main/factories/use-cases';

export const makeSignUpUserController = (): SignUpUserController => {
  const mongoLogger = makeMongoLogger();

  const signUpUserUseCase = makeSignUpUserUseCase();

  return new SignUpUserController(mongoLogger, signUpUserUseCase);
};
