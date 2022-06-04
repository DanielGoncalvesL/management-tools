import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import { badRequest, HttpResponse, ok } from '@/application/helpers';
import { ValidationBuilder, Validator } from '@/application/validation';
import { Controller } from '@/application/controllers';
import { Logger } from '@/domain/contracts/providers';

type HttpRequest = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type Model = Error | { accessToken: string };

export class SignUpUserController extends Controller {
  constructor(logger: Logger, private readonly signUpUser: SignUpUser) {
    super(logger);
  }

  async perform({
    email,
    name,
    password,
  }: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.signUpUser.perform({
      email,
      name,
      password,
    });

    if (accessToken instanceof AccessToken) {
      return ok({ accessToken: accessToken.value });
    }
    const error = accessToken;

    return badRequest(error);
  }

  override buildValidators({
    email,
    name,
    password,
    passwordConfirmation,
  }: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of()
        .required({
          fields: [
            { value: name, name: 'name' },
            { value: email, name: 'email' },
            { value: password, name: 'password' },
            { value: passwordConfirmation, name: 'passwordConfirmation' },
          ],
        })
        .build(),

      ...ValidationBuilder.of()
        .validateEmail({ field: { value: email, name: 'email' } })
        .build(),

      ...ValidationBuilder.of()
        .compare({
          field: { value: password, name: 'password' },
          compareField: {
            value: passwordConfirmation,
            name: 'passwordConfirmation',
          },
        })
        .build(),

      ...ValidationBuilder.of()
        .min({
          field: { value: password, name: 'password' },
          min: 6,
        })
        .build(),
    ];

    return validators;
  }
}
