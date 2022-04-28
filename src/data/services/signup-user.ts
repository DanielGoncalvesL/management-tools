import { SignUpUserError } from '@/domain/errors';
import { SignUpUser } from '@/domain/features';
import { LoadUserByEmailRepository } from '@/data/contracts/repositories';

export class SignUpUserService {
  constructor(private readonly loadUserByEmail: LoadUserByEmailRepository) {}

  async perform(params: SignUpUser.Params): Promise<SignUpUser.Result> {
    const { email } = params;

    await this.loadUserByEmail.loadByEmail({ email });

    return new SignUpUserError();
  }
}
