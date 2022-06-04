import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/domain/contracts/repositories';
import { SignUpUserUseCase } from '@/domain/use-cases';
import { EmailAlreadyUseError } from '@/domain/entities/errors';
import { mock, MockProxy } from 'jest-mock-extended';
import { throwError } from '@/tests/mocks';
import { Hasher, TokenGenerator } from '@/domain/contracts/providers';
import { AccessToken } from '@/domain/entities/access-token';

describe('SignUpUserUseCase', () => {
  let userRepository: MockProxy<
    CheckUserByEmailRepository & CreateUserRepository
  >;
  let hasher: MockProxy<Hasher>;
  let tokenGenerator: MockProxy<TokenGenerator>;
  let sut: SignUpUserUseCase;

  const userDatas = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  };

  const hashedPassword = 'hashed_password';
  const generateToken = 'any_generated_token';

  beforeEach(() => {
    userRepository = mock();
    hasher = mock();
    tokenGenerator = mock();

    userRepository.checkByEmail.mockResolvedValue(false);

    userRepository.createUser.mockResolvedValue({ id: 'any_id' });

    hasher.hash.mockResolvedValue(hashedPassword);

    tokenGenerator.generateToken.mockResolvedValue(generateToken);

    sut = new SignUpUserUseCase(userRepository, hasher, tokenGenerator);
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
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });

  it('should throw if CreateUserRepository throws', async () => {
    userRepository.createUser.mockImplementationOnce(throwError);

    const promise = sut.perform(userDatas);

    await expect(promise).rejects.toThrow();
  });

  it('should call TokenGenerator with correct params', async () => {
    await sut.perform(userDatas);

    expect(tokenGenerator.generateToken).toHaveBeenCalledWith({
      key: 'any_id',
      expirationInMs: AccessToken.expirationInMs,
    });
    expect(tokenGenerator.generateToken).toHaveBeenCalledTimes(1);
  });

  it('should throw if TokenGenerator throws', async () => {
    tokenGenerator.generateToken.mockImplementationOnce(throwError);

    const promise = sut.perform(userDatas);

    await expect(promise).rejects.toThrow();
  });

  it('should call TokenGenerator with correct params', async () => {
    const signUpResult = await sut.perform(userDatas);

    expect(signUpResult).toEqual(new AccessToken(generateToken));
  });
});
