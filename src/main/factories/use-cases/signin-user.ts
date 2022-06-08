import { setupSignInUser, SignInUser } from '@/domain/use-cases';
import {
  makeBcryptAdapter,
  makeJwtTokenGenerator,
} from '@/main/factories/infra/gateways';
import { makePgUserRepository } from '@/main/factories/infra/postgres/repositories';

export const makeSignInUser = (): SignInUser => {
  return setupSignInUser(
    makePgUserRepository(),
    makeBcryptAdapter(),
    makeJwtTokenGenerator(),
  );
};
