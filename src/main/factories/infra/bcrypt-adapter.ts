import { BcryptAdapter } from '@/infra/crypto';

export const makeBcryptAdapter = (): BcryptAdapter => {
  return new BcryptAdapter(12);
};
