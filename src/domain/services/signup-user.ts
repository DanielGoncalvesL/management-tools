import { EmailAlreadyUseError } from '@/domain/errors';
import { SignUpUser } from '@/domain/features';
import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/domain/contracts/repositories';
import { Hasher, TokenGenerator } from '@/domain/contracts/providers';
import { AccessToken } from '@/domain/models/access-token';

type Params = SignUpUser.Params;
type Result = SignUpUser.Result;
export class SignUpUserService implements SignUpUser {
  constructor(
    private readonly userRepository: CheckUserByEmailRepository &
      CreateUserRepository,
    private readonly hasher: Hasher,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async perform({ email, name, password }: Params): Promise<Result> {
    const userExists = await this.userRepository.checkByEmail({
      email,
    });

    if (userExists) {
      return new EmailAlreadyUseError();
    }

    const hashedPassword = await this.hasher.hash({ plaintext: password });

    const { id } = await this.userRepository.createUser({
      email,
      name,
      password: hashedPassword,
    });

    const accessToken = await this.tokenGenerator.generateToken({
      key: id,
      expirationInMs: AccessToken.expirationInMs,
    });

    return new AccessToken(accessToken);
  }
}
