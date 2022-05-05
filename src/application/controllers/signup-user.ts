import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import {
  badRequest,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
} from '@/application/helpers';
import { RequiredFieldError } from '@/application/errors';

type HttpRequest = {
  name: string | undefined | null;
  email: string | undefined | null;
  password: string | undefined | null;
};

type Model = Error | { accessToken: string };
export class SignUpUserController {
  constructor(private readonly SignUpUser: SignUpUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const { name, email, password } = httpRequest;

      if (name === '' || name === null || name === undefined) {
        return badRequest(new RequiredFieldError('name'));
      }

      if (email === '' || email === null || email === undefined) {
        return badRequest(new RequiredFieldError('email'));
      }

      if (password === '' || password === null || password === undefined) {
        return badRequest(new RequiredFieldError('password'));
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
}
