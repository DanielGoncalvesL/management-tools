import { EmailAlreadyUseError } from '@/domain/errors';
import { SignUpUser } from '@/domain/features';
import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/data/contracts/repositories';
import { Hasher, TokenGenerator } from '@/data/contracts/providers';

export class SignUpUserService {
  constructor(
    private readonly userRepository: CheckUserByEmailRepository &
      CreateUserRepository,
    private readonly hasher: Hasher,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async perform(params: SignUpUser.Params): Promise<SignUpUser.Result> {
    const { email, password, name } = params;

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

    await this.tokenGenerator.generateToken({ key: id });

    return { token: 'any_token' };
  }
}
