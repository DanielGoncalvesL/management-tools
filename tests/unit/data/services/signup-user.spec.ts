import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/data/contracts/repositories';
import { SignUpUserService } from '@/data/services';
import { EmailAlreadyUseError } from '@/domain/errors';
import { mock, MockProxy } from 'jest-mock-extended';
import { throwError } from '@/tests/unit/mocks';
import { Hasher } from '@/data/contracts/providers';

describe('SignUpUserService', () => {
  let userRepository: MockProxy<
    CheckUserByEmailRepository & CreateUserRepository
  >;
  let hasher: MockProxy<Hasher>;
  let sut: SignUpUserService;

  const userDatas = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  };

  const hashedPassword = 'hashed_password';

  beforeEach(() => {
    userRepository = mock();
    hasher = mock();

    userRepository.checkByEmail.mockResolvedValue(false);
    hasher.hash.mockResolvedValue(hashedPassword);

    sut = new SignUpUserService(userRepository, hasher);
  });

  it('should call CheckUserByEmailRepository with correct params', async () => {
    await sut.perform(userDatas);

    expect(userRepository.checkByEmail).toHaveBeenCalledWith({
      email: 'any_email',
    });
    expect(userRepository.checkByEmail).toHaveBeenCalledTimes(1);
  });

  it('should return EmailAlreadyUseError when CheckUserByEmailRepository returns data', async () => {
    userRepository.checkByEmail.mockResolvedValueOnce(true);

    const signUpResult = await sut.perform(userDatas);

    expect(signUpResult).toEqual(new EmailAlreadyUseError());
  });

  it('should throw if CheckUserByEmailRepository throws', async () => {
    userRepository.checkByEmail.mockImplementationOnce(throwError);

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

  it('should call CreateUserRepository with correct params', async () => {
    await sut.perform(userDatas);

    expect(userRepository.createUser).toHaveBeenCalledWith({
      name: userDatas.name,
      email: userDatas.email,
      password: hashedPassword,
    });
  });

  it('should throw if CreateUserRepository throws', async () => {
    userRepository.createUser.mockImplementationOnce(throwError);

    const promise = sut.perform(userDatas);

    await expect(promise).rejects.toThrow();
  });
});
