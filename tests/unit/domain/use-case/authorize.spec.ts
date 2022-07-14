import { throwError } from '@/../tests/mocks';
import { UnauthorizedError } from '@/application/errors';
import { mock, MockProxy } from 'jest-mock-extended';

export interface TokenValidator {
  validate(token: TokenValidator.Params): Promise<TokenValidator.Result>;
}

export namespace TokenValidator {
  export type Params = { token: string };

  export type Result = { id: string } | false;
}

export interface CheckUserById {
  checkById(id: CheckUserById.Params): Promise<CheckUserById.Result>;
}

export namespace CheckUserById {
  export type Params = { id: string };

  export type Result = boolean;
}

type Setup = (
  tokenValidator: TokenValidator,
  userRepository: CheckUserById,
) => Authorize;

type Authorize = (params: { token: string }) => Promise<void>;

const setupAuthorize: Setup =
  (tokenValidator, userRepository) => async params => {
    const token = await tokenValidator.validate(params);

    if (!token) {
      throw new UnauthorizedError();
    }
  };

describe('Authorize', () => {
  let userRepository: MockProxy<CheckUserById>;
  let tokenValidator: MockProxy<TokenValidator>;
  let sut: Authorize;

  const sutData = { token: 'any_token' };

  beforeEach(() => {
    userRepository = mock();
    tokenValidator = mock();

    userRepository.checkById.mockResolvedValue(true);

    tokenValidator.validate.mockResolvedValue({ id: 'any_token' });

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
});
