import { SignUpUserError } from '@/domain/errors';
import { SignUpUser } from '@/domain/features';

class SignUpUserService {
  constructor(private readonly loadUserByEmail: LoadUserByEmailRepository) {}

  async perform(params: SignUpUser.Params): Promise<SignUpUser.Result> {
    const { email } = params;

    await this.loadUserByEmail.loadByEmail({ email });

    return new SignUpUserError();
  }
}

interface LoadUserByEmailRepository {
  loadByEmail: (
    params: LoadUserByEmailRepository.Params,
  ) => Promise<LoadUserByEmailRepository.Result>;
}

namespace LoadUserByEmailRepository {
  export type Params = {
    email: string;
  };

  export type Result = undefined;
}

class LoadUserByEmailSpy implements LoadUserByEmailRepository {
  email?: string;
  result = undefined;

  async loadByEmail(
    params: LoadUserByEmailRepository.Params,
  ): Promise<LoadUserByEmailRepository.Result> {
    this.email = params.email;

    return this.result;
  }
}

describe('SignUpUserService', () => {
  it('should call LoadUserByEmail with correct params', async () => {
    const loadUserByEmail = new LoadUserByEmailSpy();

    const sut = new SignUpUserService(loadUserByEmail);

    await sut.perform({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(loadUserByEmail.email).toBe('any_email');
  });

  it('should return authentication error when LoadUserByEmail returns undefined', async () => {
    const loadUserByEmail = new LoadUserByEmailSpy();

    loadUserByEmail.result = undefined;

    const sut = new SignUpUserService(loadUserByEmail);

    const signUpResult = await sut.perform({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(signUpResult).toEqual(new SignUpUserError());
  });
});
