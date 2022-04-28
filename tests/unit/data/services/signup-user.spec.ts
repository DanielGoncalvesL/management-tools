import { LoadUserByEmailRepository } from '@/data/contracts/repositories';
import { SignUpUserService } from '@/data/services';
import { SignUpUserError } from '@/domain/errors';
import { mock, MockProxy } from 'jest-mock-extended';

describe('SignUpUserService', () => {
  let loadUserByEmailRepository: MockProxy<LoadUserByEmailRepository>;
  let sut: SignUpUserService;
  const userDatas = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  };

  beforeEach(() => {
    loadUserByEmailRepository = mock();

    sut = new SignUpUserService(loadUserByEmailRepository);
  });

  it('should call LoadUserByEmailRepository with correct params', async () => {
    await sut.perform(userDatas);

    expect(loadUserByEmailRepository.loadByEmail).toHaveBeenCalledWith({
      email: 'any_email',
    });
    expect(loadUserByEmailRepository.loadByEmail).toHaveBeenCalledTimes(1);
  });

  it('should return authentication error when LoadUserByEmailRepository returns undefined', async () => {
    const signUpResult = await sut.perform(userDatas);

    expect(signUpResult).toEqual(new SignUpUserError());
  });
});
