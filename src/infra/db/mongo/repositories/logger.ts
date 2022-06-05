import { Logger } from '@/domain/contracts/providers';
import { MongoHelper } from '@/infra/db/mongo/helpers';

export class MongoLoggerRepository implements Logger {
  async logging({ paramToLogger }: Logger.Params): Promise<void> {
    const loggerCollection = await MongoHelper.getInstance().getCollection(
      'logs',
    );

    const date = new Date();

    if (paramToLogger instanceof Error) {
      await loggerCollection.insertOne({
        stack: paramToLogger.stack,
        name: paramToLogger.name,
        message: paramToLogger.message,
        cause: paramToLogger.cause,
        date,
      });
    } else {
      await loggerCollection.insertOne({
        data: paramToLogger,
        date,
      });
    }
  }
}
