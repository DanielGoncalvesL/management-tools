import { EmailAlreadyUseError } from '@/domain/errors';
import { SignUpUser } from '@/domain/features';
import { CheckUserByEmailRepository } from '@/data/contracts/repositories';
import { Hasher } from '@/data/contracts/providers';

export class SignUpUserService {
  constructor(
    private readonly checkUserByEmailRepository: CheckUserByEmailRepository,
    private readonly hasher: Hasher,
  ) {}

  async perform(params: SignUpUser.Params): Promise<SignUpUser.Result> {
    const { email, password } = params;

    const userExists = await this.checkUserByEmailRepository.checkByEmail({
      email,
    });

    if (userExists) {
      return new EmailAlreadyUseError();
    }

    await this.hasher.hash({ plaintext: password });
  }
}
