import { setupSignUpUser, SignUpUser } from '@/domain/use-cases';
import {
  makeBcryptAdapter,
  makeJwtTokenGenerator,
} from '@/main/factories/infra/gateways';
import { makePgUserRepository } from '@/main/factories/infra/postgres/repositories';

export const makeSignUpUser = (): SignUpUser => {
  return setupSignUpUser(
    makePgUserRepository(),
    makeBcryptAdapter(),
    makeJwtTokenGenerator(),
  );
};
