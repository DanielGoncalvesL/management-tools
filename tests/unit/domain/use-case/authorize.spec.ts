import { throwError } from '@/../tests/mocks';
import { UnauthorizedError } from '@/application/errors';
import { TokenValidator } from '@/domain/contracts/providers';
import { CheckUserById } from '@/domain/contracts/repositories';
import { Authorize, setupAuthorize } from '@/domain/use-cases';
import { mock, MockProxy } from 'jest-mock-extended';

describe('Authorize', () => {
  let userRepository: MockProxy<CheckUserById>;
  let tokenValidator: MockProxy<TokenValidator>;
  let sut: Authorize;

  const sutData = { token: 'any_token' };

  beforeEach(() => {
    userRepository = mock();
    tokenValidator = mock();

    userRepository.checkById.mockResolvedValue(true);

    tokenValidator.validate.mockResolvedValue({ id: 'any_id' });

    sut = setupAuthorize(tokenValidator, userRepository);
  });

  it('should call TokenValidator with correct params', async () => {
    await sut(sutData);

    expect(tokenValidator.validate).toHaveBeenCalledWith(sutData);
    expect(tokenValidator.validate).toHaveBeenCalledTimes(1);
  });

  it('should throw if TokenValidator throws', async () => {
    tokenValidator.validate.mockImplementationOnce(throwError);

    const promise = sut(sutData);

    await expect(promise).rejects.toThrow();
  });

  it('should throw if TokenValidator returns false', async () => {
    tokenValidator.validate.mockResolvedValueOnce(false);

    const promise = sut(sutData);

    await expect(promise).rejects.toThrow(new UnauthorizedError());
  });

  it('should call UserRepository with correct params', async () => {
    await sut(sutData);

    expect(userRepository.checkById).toHaveBeenCalledWith({
      id: 'any_id',
    });
    expect(userRepository.checkById).toHaveBeenCalledTimes(1);
  });

  it('should throw if UserRepository throws', async () => {
    userRepository.checkById.mockImplementationOnce(throwError);

    const promise = sut(sutData);

    await expect(promise).rejects.toThrow();
  });

  it('should throw if UserRepository returns false', async () => {
    userRepository.checkById.mockResolvedValueOnce(false);

    const promise = sut(sutData);

    await expect(promise).rejects.toThrow(new UnauthorizedError());
  });

  it('should return true if UserRepository returns true', async () => {
    const checkUserByIdResult = await sut(sutData);

    expect(checkUserByIdResult).toBeTruthy();
  });
});
