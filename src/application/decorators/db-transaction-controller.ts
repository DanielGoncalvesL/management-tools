import { DbTransaction } from '@/application/contracts';
import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/helpers';
import { Logger } from '@/domain/contracts/providers';

export class DbTransactionController extends Controller {
  constructor(
    private readonly decoratee: Controller,
    private readonly db: DbTransaction,
    logger: Logger,
  ) {
    super(logger);
  }

  async perform(httpRequest: any): Promise<HttpResponse> {
    await this.db.openTransaction();
    try {
      const httpResponse = await this.decoratee.handle(httpRequest);

      await this.db.commit();

      return httpResponse;
    } catch (error) {
      await this.db.rollback();

      throw error;
    } finally {
      await this.db.closeTransaction();
    }
  }
}
