import { UnauthorizedError } from '@/application/errors';
import { TokenValidator } from '@/domain/contracts/providers';
import { CheckUserById } from '@/domain/contracts/repositories';

type Setup = (
  tokenValidator: TokenValidator,
  userRepository: CheckUserById,
) => Authorize;

export type Authorize = (params: { token: string }) => Promise<boolean>;

export const setupAuthorize: Setup =
  (tokenValidator, userRepository) => async params => {
    const token = await tokenValidator.validate(params);

    if (token) {
      const isExisted = await userRepository.checkById({ id: token.id });

      if (isExisted) {
        return true;
      }
    }

    throw new UnauthorizedError();
  };
