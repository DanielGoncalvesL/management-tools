import { SignUpUserUseCase } from '@/domain/use-cases';
import {
  makePgUserRepository,
  makeBcryptAdapter,
  makeJwtTokenGenerator,
} from '@/main/factories/infra';

export const makeSignUpUserUseCase = (): SignUpUserUseCase =>
  new SignUpUserUseCase(
    makePgUserRepository(),
    makeBcryptAdapter(),
    makeJwtTokenGenerator(),
  );
