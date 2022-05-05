import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import { HttpResponse } from '@/application/helpers';
import { ServerError } from '@/application/errors';

export class SignUpUserController {
  constructor(private readonly SignUpUser: SignUpUser) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      if (!httpRequest.name) {
        return {
          statusCode: 400,
          data: new Error('The field token is required'),
        };
      }

      if (!httpRequest.email) {
        return {
          statusCode: 400,
          data: new Error('The field email is required'),
        };
      }

      if (!httpRequest.password) {
        return {
          statusCode: 400,
          data: new Error('The field password is required'),
        };
      }

      const result = await this.SignUpUser.perform(httpRequest);

      if (result instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: result.value,
          },
        };
      } else {
        return {
          statusCode: 401,
          data: result,
        };
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        data: new ServerError(error),
      };
    }
  }
}
