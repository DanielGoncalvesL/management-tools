import { LoadByEmailRepository } from '@/domain/contracts/repositories';
import { setupSignInUser, SignInUser } from '@/domain/use-cases';
import { mock, MockProxy } from 'jest-mock-extended';
import { throwError } from '@/tests/mocks';
import { HashComparer, TokenGenerator } from '@/domain/contracts/providers';
import { SignInError } from '@/domain/entities/errors';
import { AccessToken } from '@/domain/entities';

describe('SignUpUser', () => {
  let userRepository: MockProxy<LoadByEmailRepository>;
  let hashComparer: MockProxy<HashComparer>;
  let tokenGenerator: MockProxy<TokenGenerator>;
  let sut: SignInUser;

  const userDatas = {
    email: 'any_email',
    password: 'any_password',
  };

  const loadByEmailDatas = {
    id: 'any_id',
    password: 'hashed_password',
  };

  const generateToken = 'any_token';

  beforeEach(() => {
    userRepository = mock();
    hashComparer = mock();
    tokenGenerator = mock();

    userRepository.loadByEmail.mockResolvedValue(loadByEmailDatas);

    hashComparer.compare.mockResolvedValue(true);

    tokenGenerator.generateToken.mockResolvedValue(generateToken);

    sut = setupSignInUser(userRepository, hashComparer, tokenGenerator);
  });

  it('should call LoadByEmail with correct params', async () => {
    await sut(userDatas);

    expect(userRepository.loadByEmail).toHaveBeenCalledWith({
      email: 'any_email',
    });

    expect(userRepository.loadByEmail).toHaveBeenCalledTimes(1);
  });

  it('should throw SignInError when LoadByEmail returns undefined', async () => {
    userRepository.loadByEmail.mockResolvedValueOnce(undefined);

    const promise = sut(userDatas);

    await expect(promise).rejects.toThrow(new SignInError());
  });

  it('should throw if LoadByEmail throws', async () => {
    userRepository.loadByEmail.mockImplementationOnce(throwError);

    const promise = sut(userDatas);

    await expect(promise).rejects.toThrow();
  });

  it('should call HashComparer with correct params', async () => {
    await sut(userDatas);

    expect(hashComparer.compare).toBeCalledWith({
      plaintext: userDatas.password,
      textToCompare: loadByEmailDatas.password,
    });
    expect(hashComparer.compare).toHaveBeenCalledTimes(1);
  });

  it('should throw SignInError when HashComparer returns false', async () => {
    hashComparer.compare.mockResolvedValueOnce(false);

    const promise = sut(userDatas);

    await expect(promise).rejects.toThrow(new SignInError());
  });

  it('should throw if HashComparer throws', async () => {
    hashComparer.compare.mockImplementationOnce(throwError);

    const promise = sut(userDatas);

    await expect(promise).rejects.toThrow();
  });

  it('should call TokenGenerator with correct params', async () => {
    await sut(userDatas);

    expect(tokenGenerator.generateToken).toHaveBeenCalledWith({
      key: loadByEmailDatas.id,
      expirationInMs: AccessToken.expirationInMs,
    });
    expect(tokenGenerator.generateToken).toHaveBeenCalledTimes(1);
  });

  it('should throw if TokenGenerator throws', async () => {
    tokenGenerator.generateToken.mockImplementationOnce(throwError);

    const promise = sut(userDatas);

    await expect(promise).rejects.toThrow();
  });

  it('should return accessToken with success', async () => {
    const signUpResult = await sut(userDatas);

    expect(signUpResult).toEqual({ accessToken: generateToken });
  });
});
