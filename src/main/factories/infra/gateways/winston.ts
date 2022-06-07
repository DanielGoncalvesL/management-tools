import { WinstonAdapter } from '@/infra/logger';

export const makeWinstonAdapter = (): WinstonAdapter => new WinstonAdapter();
