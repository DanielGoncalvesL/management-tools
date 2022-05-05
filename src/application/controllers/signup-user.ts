import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import { badRequest, HttpResponse, unauthorized } from '@/application/helpers';
import { RequiredFieldError, ServerError } from '@/application/errors';

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
        return {
          statusCode: 200,
          data: {
            accessToken: accessToken.value,
          },
        };
      } else {
        return unauthorized();
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        data: new ServerError(error),
      };
    }
  }
}
