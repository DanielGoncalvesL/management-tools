import { EmailAlreadyUseError } from '@/domain/entities/errors';
import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/domain/contracts/repositories';
import { Hasher, TokenGenerator } from '@/domain/contracts/providers';
import { AccessToken } from '@/domain/entities/access-token';

type Setup = (
  userRepository: CheckUserByEmailRepository & CreateUserRepository,
  hasher: Hasher,
  tokenGenerator: TokenGenerator,
) => SignUpUser;

export type SignUpUser = (params: {
  email: string;
  name: string;
  password: string;
}) => Promise<{ accessToken: string }>;

export const setupSignUpUser: Setup =
  (userRepository, hasher, tokenGenerator) =>
  async ({ email, name, password }) => {
    const userExists = await userRepository.checkByEmail({
      email,
    });

    if (userExists) {
      throw new EmailAlreadyUseError();
    }

    const hashedPassword = await hasher.hash({ plaintext: password });

    const { id } = await userRepository.createUser({
      email,
      name,
      password: hashedPassword,
    });

    const accessToken = await tokenGenerator.generateToken({
      key: id,
      expirationInMs: AccessToken.expirationInMs,
    });

    return { accessToken };
  };
