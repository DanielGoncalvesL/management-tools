import { WinstonAdapter } from '@/infra/logger';

export const makeWinstonAdapter = (): WinstonAdapter => {
  return new WinstonAdapter();
};
