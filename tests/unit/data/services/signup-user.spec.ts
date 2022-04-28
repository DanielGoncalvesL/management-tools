import { CheckUserByEmailRepository } from '@/data/contracts/repositories';
import { SignUpUserService } from '@/data/services';
import { EmailAlreadyUseError } from '@/domain/errors';
import { mock, MockProxy } from 'jest-mock-extended';
import { throwError } from '@/tests/unit/mocks';
import { Hasher } from '@/data/contracts/providers';

describe('SignUpUserService', () => {
  let checkUserByEmailRepository: MockProxy<CheckUserByEmailRepository>;
  let hasher: MockProxy<Hasher>;
  let sut: SignUpUserService;

  const userDatas = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  };

  beforeEach(() => {
    checkUserByEmailRepository = mock();
    hasher = mock();

    checkUserByEmailRepository.checkByEmail.mockResolvedValue(false);

    sut = new SignUpUserService(checkUserByEmailRepository, hasher);
  });

  it('should call CheckUserByEmailRepository with correct params', async () => {
    await sut.perform(userDatas);

    expect(checkUserByEmailRepository.checkByEmail).toHaveBeenCalledWith({
      email: 'any_email',
    });
    expect(checkUserByEmailRepository.checkByEmail).toHaveBeenCalledTimes(1);
  });

  it('should return EmailAlreadyUseError when CheckUserByEmailRepository returns data', async () => {
    checkUserByEmailRepository.checkByEmail.mockResolvedValueOnce(true);

    const signUpResult = await sut.perform(userDatas);

    expect(signUpResult).toEqual(new EmailAlreadyUseError());
  });

  it('should throw if CheckUserByEmailRepository throws', async () => {
    checkUserByEmailRepository.checkByEmail.mockImplementationOnce(throwError);

    const promise = sut.perform(userDatas);

    await expect(promise).rejects.toThrow();
  });

  it('should call Hasher with correct params', async () => {
    await sut.perform(userDatas);

    expect(hasher.hash).toBeCalledWith({ plaintext: userDatas.password });
    expect(hasher.hash).toHaveBeenCalledTimes(1);
  });

  it('should throw if Hasher throws', async () => {
    hasher.hash.mockImplementationOnce(throwError);

    const promise = sut.perform(userDatas);

    await expect(promise).rejects.toThrow();
  });
});
