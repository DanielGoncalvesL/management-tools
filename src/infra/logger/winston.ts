import { Logger as ILogger } from '@/data/contracts/providers';
import { env } from '@/main/config/env';
import winston, { Logger } from 'winston';

export class WinstonAdapter implements ILogger {
  private readonly logger: Logger;

  constructor() {
    // Stryker disable all

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.colorize({
          message: true,
          level: true,
          all: true,
          colors: { info: 'blue', error: 'red' },
        }),
      ),
      transports: [
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
      ],
    });

    /* istanbul ignore next */
    if (env.nodeEnv !== 'prod') {
      this.logger.add(new winston.transports.Console());
    }
  }
  // Stryker restore all

  logging({ paramToLogger }: ILogger.Params): void {
    if (paramToLogger instanceof Error) {
      this.logger.error(paramToLogger);
    } else {
      this.logger.info(paramToLogger);
    }
  }
}