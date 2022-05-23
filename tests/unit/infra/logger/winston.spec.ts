/* eslint-disable import/first */
const logger = {
  error: jest.fn(),
  info: jest.fn(),
};

jest.mock('winston', () => ({
  format: {
    colorize: jest.fn(),
    combine: jest.fn(),
    json: jest.fn(),
    errors: jest.fn(),
  },
  createLogger: jest.fn().mockReturnValue(logger),
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
}));

import { WinstonAdapter } from '@/infra/logger';

describe('WinstonAdapter', () => {
  let sut: WinstonAdapter;

  beforeEach(() => {
    sut = new WinstonAdapter();
  });

  it('should call logger.info with correct params', async () => {
    sut.logging({ paramToLogger: 'any_message' });

    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('any_message');
  });

  it('should call logger.error with correct params', async () => {
    sut.logging({ paramToLogger: new Error('any_error') });

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(new Error('any_error'));
  });
});
