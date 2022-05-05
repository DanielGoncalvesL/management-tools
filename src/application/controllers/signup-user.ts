import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import {
  badRequest,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
} from '@/application/helpers';
import {
  RequiredStringValidator,
  ValidationComposite,
} from '@/application/validation';

type HttpRequest = {
  name: string;
  email: string;
  password: string;
};

type Model = Error | { accessToken: string };
export class SignUpUserController {
  constructor(private readonly SignUpUser: SignUpUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const { name, email, password } = httpRequest;

      const error = this.validate(httpRequest);

      if (error !== undefined) {
        return badRequest(error);
      }

      const accessToken = await this.SignUpUser.perform({
        name,
        email,
        password,
      });

      if (accessToken instanceof AccessToken) {
        return ok({ accessToken: accessToken.value });
      } else {
        return unauthorized();
      }
    } catch (error: any) {
      return serverError(error);
    }
  }

  private validate(httpRequest: HttpRequest): Error | undefined {
    const { name, email, password } = httpRequest;

    const validators = [
      new RequiredStringValidator(name, 'name'),
      new RequiredStringValidator(email, 'email'),
      new RequiredStringValidator(password, 'password'),
    ];

    const validator = new ValidationComposite(validators);

    return validator.validate();
  }
}
