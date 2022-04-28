import { LoadUserByEmailRepository } from '@/data/contracts/repositories';
import { SignUpUserService } from '@/data/services';
import { SignUpUserError } from '@/domain/errors';
import { mock } from 'jest-mock-extended';

describe('SignUpUserService', () => {
  it('should call LoadUserByEmail with correct params', async () => {
    const loadUserByEmail = mock<LoadUserByEmailRepository>();

    const sut = new SignUpUserService(loadUserByEmail);

    await sut.perform({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(loadUserByEmail.loadByEmail).toHaveBeenCalledWith({
      email: 'any_email',
    });
    expect(loadUserByEmail.loadByEmail).toHaveBeenCalledTimes(1);
  });

  it('should return authentication error when LoadUserByEmail returns undefined', async () => {
    const loadUserByEmail = mock<LoadUserByEmailRepository>();

    loadUserByEmail.loadByEmail.mockResolvedValueOnce(undefined);

    const sut = new SignUpUserService(loadUserByEmail);

    const signUpResult = await sut.perform({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(signUpResult).toEqual(new SignUpUserError());
  });
});
