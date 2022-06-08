import { SignInError } from '@/domain/entities/errors';
import { LoadByEmailRepository } from '@/domain/contracts/repositories';
import { HashComparer, TokenGenerator } from '@/domain/contracts/providers';
import { AccessToken } from '@/domain/entities';

type Setup = (
  userRepository: LoadByEmailRepository,
  hashComparer: HashComparer,
  tokenGenerator: TokenGenerator,
) => SignInUser;

export type SignInUser = (params: {
  email: string;
  password: string;
}) => Promise<{ accessToken: string }>;

export const setupSignInUser: Setup =
  (userRepository, hashComparer, tokenGenerator) =>
  async ({ email, password }) => {
    const user = await userRepository.loadByEmail({ email });

    if (!user) {
      throw new SignInError();
    }

    const passwordMatched = await hashComparer.compare({
      plaintext: password,
      textToCompare: user.password,
    });

    if (!passwordMatched) {
      throw new SignInError();
    }

    const accessToken = await tokenGenerator.generateToken({
      key: user.id,
      expirationInMs: AccessToken.expirationInMs,
    });

    return { accessToken };
  };
