import { badRequest, HttpResponse, serverError } from '@/application/helpers';
import { ValidationComposite, Validator } from '@/application/validation';
import { Logger } from '@/data/contracts/providers';

export abstract class Controller {
  constructor(private readonly logger: Logger) {}

  abstract perform(httpRequest: any): Promise<HttpResponse>;

  buildValidators(httpRequest: any): Validator[] {
    return [];
  }

  async handle(httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest);

    if (error !== undefined) {
      return badRequest(error);
    }

    try {
      return await this.perform(httpRequest);
    } catch (error) {
      const catchError = error as Error;

      this.logger.logging({ paramToLogger: catchError });

      return serverError(catchError);
    }
  }

  private validate(httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest);

    return new ValidationComposite(validators).validate();
  }
}
