import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import { HttpResponse, ok, unauthorized } from '@/application/helpers';
import { ValidationBuilder, Validator } from '@/application/validation';
import { Controller } from '@/application/controllers';

type HttpRequest = {
  name: string;
  email: string;
  password: string;
};

type Model = Error | { accessToken: string };

export class SignUpUserController extends Controller {
  constructor(private readonly signUpUser: SignUpUser) {
    super();
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.signUpUser.perform(httpRequest);

    return accessToken instanceof AccessToken
      ? ok({ accessToken: accessToken.value })
      : unauthorized();
  }

  override buildValidators(httpRequest: HttpRequest): Validator[] {
    const { name, email, password } = httpRequest;

    const validators = [
      ...ValidationBuilder.of()
        .required({ value: name, fieldName: 'name' })
        .build(),
      ...ValidationBuilder.of()
        .required({ value: email, fieldName: 'email' })
        .build(),
      ...ValidationBuilder.of()
        .required({ value: password, fieldName: 'password' })
        .build(),
    ];

    return validators;
  }
}
