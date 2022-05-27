import { BcryptAdapter } from '@/infra/crypto';

export const makeBcryptAdapter = (): BcryptAdapter => new BcryptAdapter(12);
