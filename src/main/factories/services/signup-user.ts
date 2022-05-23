import { SignUpUserService } from '@/data/services';
import {
  makePgUserRepository,
  makeBcryptAdapter,
  makeJwtTokenGenerator,
} from '@/main/factories/infra';

export const makeSignUpUserService = (): SignUpUserService =>
  new SignUpUserService(
    makePgUserRepository(),
    makeBcryptAdapter(),
    makeJwtTokenGenerator(),
  );
