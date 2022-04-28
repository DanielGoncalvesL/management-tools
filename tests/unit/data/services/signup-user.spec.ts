import { LoadUserByEmailRepository } from '@/data/contracts/repositories';
import { SignUpUserService } from '@/data/services';
import { SignUpUserError } from '@/domain/errors';

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
