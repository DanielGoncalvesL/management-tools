import { SignInUserController } from '@/application/controllers';
import { makeMongoLogger } from '@/main/factories/infra/mongo/repositories/mongo-logger';
import { makeSignInUser } from '@/main/factories/use-cases';

export const makeSignInUserController = (): SignInUserController => {
  const mongoLogger = makeMongoLogger();

  const signInUser = makeSignInUser();

  return new SignInUserController(mongoLogger, signInUser);
};
