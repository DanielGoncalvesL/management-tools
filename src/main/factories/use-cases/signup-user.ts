import { setupSignUpUser, SignUpUser } from '@/domain/use-cases';
import {
  makePgUserRepository,
  makeBcryptAdapter,
  makeJwtTokenGenerator,
} from '@/main/factories/infra';

export const makeSignUpUser = (): SignUpUser => {
  return setupSignUpUser(
    makePgUserRepository(),
    makeBcryptAdapter(),
    makeJwtTokenGenerator(),
  );
};
