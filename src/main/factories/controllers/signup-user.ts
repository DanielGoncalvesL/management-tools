import { SignUpUserController } from '@/application/controllers';
import { SignUpUserService } from '@/data/services';
import { JwtTokenGenerator } from '@/infra/crypto';
import { BcryptAdapter } from '@/infra/crypto/bcrypt-adapter';
import { PgUserRepository } from '@/infra/repositories/postgres';
import { env } from '@/main/config/env';

export const makeSignUpUserController = (): SignUpUserController => {
  const userRepository = new PgUserRepository();

  const bcryptAdapter = new BcryptAdapter(12);

  const jwtTokenGenerator = new JwtTokenGenerator(env.jwtSecret);

  const signUpUserService = new SignUpUserService(
    userRepository,
    bcryptAdapter,
    jwtTokenGenerator,
  );

  return new SignUpUserController(signUpUserService);
};
