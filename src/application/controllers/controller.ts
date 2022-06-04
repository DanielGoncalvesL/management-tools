import { badRequest, HttpResponse, serverError } from '@/application/helpers';
import { ValidationComposite, Validator } from '@/application/validation';
import { Logger } from '@/domain/contracts/providers';

export abstract class Controller {
  constructor(private readonly logger: Logger) {}

  abstract perform(httpRequest: any): Promise<HttpResponse>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildValidators(httpRequest: any): Validator[] {
    return [];
  }

  async handle(httpRequest: any): Promise<HttpResponse> {
    const validateError = this.validate(httpRequest);

    if (validateError !== undefined) {
      return badRequest(validateError);
    }

    try {
      return await this.perform(httpRequest);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      const catchError = error as Error;

      await this.logger.logging({ paramToLogger: catchError });

      return serverError(catchError);
    }
  }

  private validate(httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest);

    return new ValidationComposite(validators).validate();
  }
}
