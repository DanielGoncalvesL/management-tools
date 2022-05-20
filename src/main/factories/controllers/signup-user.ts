import { SignUpUserController } from '@/application/controllers';
import { makeWinstonAdapter } from '@/main/factories/infra';
import { makeSignUpUserService } from '@/main/factories/services';

export const makeSignUpUserController = (): SignUpUserController => {
  const winstonAdapter = makeWinstonAdapter();

  const signUpUserService = makeSignUpUserService();

  return new SignUpUserController(winstonAdapter, signUpUserService);
};
