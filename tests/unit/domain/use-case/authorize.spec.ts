import { throwError } from '@/../tests/mocks';
import { mock, MockProxy } from 'jest-mock-extended';

export interface TokenValidator {
  validate(token: TokenValidator.Params): Promise<void>;
}

export namespace TokenValidator {
  export type Params = { token: string };
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
    await tokenValidator.validate(params);
  };

describe('Authorize', () => {
  let userRepository: MockProxy<CheckUserById>;
  let tokenValidator: MockProxy<TokenValidator>;
  let sut: Authorize;

  beforeEach(() => {
    userRepository = mock();
    tokenValidator = mock();

    userRepository.checkById.mockResolvedValue(true);

    tokenValidator.validate.mockResolvedValue();

    sut = setupAuthorize(tokenValidator, userRepository);
  });

  it('should call TokenValidator with correct params', async () => {
    await sut({ token: 'any_token' });

    expect(tokenValidator.validate).toHaveBeenCalledWith({
      token: 'any_token',
    });
    expect(tokenValidator.validate).toHaveBeenCalledTimes(1);
  });

  it('should throw if TokenValidator throws', async () => {
    tokenValidator.validate.mockImplementationOnce(throwError);

    const promise = sut({ token: 'any_token' });

    await expect(promise).rejects.toThrow();
  });
});
