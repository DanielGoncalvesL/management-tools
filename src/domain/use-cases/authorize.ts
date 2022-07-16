import { UnauthorizedError } from '@/application/errors';
import { TokenValidator } from '@/domain/contracts/providers';
import { CheckUserById } from '@/domain/contracts/repositories';

type Setup = (
  tokenValidator: TokenValidator,
  userRepository: CheckUserById,
) => Authorize;

type Input = { token: string };
type OutPut = { id: string };

export type Authorize = (params: Input) => Promise<OutPut>;

export const setupAuthorize: Setup =
  (tokenValidator, userRepository) => async params => {
    const token = await tokenValidator.decrypt(params);

    if (token) {
      const isExisted = await userRepository.checkById({ id: token.key });

      if (isExisted) {
        return { id: token.key };
      }
    }

    throw new UnauthorizedError();
  };
