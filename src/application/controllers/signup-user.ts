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

export class SignUpUserController {
  constructor(private readonly SignUpUser: SignUpUser) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      if (!httpRequest.name) {
        return badRequest(new RequiredFieldError('name'));
      }

      if (!httpRequest.email) {
        return badRequest(new RequiredFieldError('email'));
      }

      if (!httpRequest.password) {
        return badRequest(new RequiredFieldError('password'));
      }

      const accessToken = await this.SignUpUser.perform(httpRequest);

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
