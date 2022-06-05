import { Logger } from '@/domain/contracts/providers';
import { SignUpUser } from '@/domain/use-cases';
import { badRequest, HttpResponse, ok } from '@/application/helpers';
import { ValidationBuilder, Validator } from '@/application/validation';
import { Controller } from '@/application/controllers';

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
    try {
      const { accessToken } = await this.signUpUser({
        email,
        name,
        password,
      });

      return ok({ accessToken });
    } catch (error) {
      return badRequest(error as Error);
    }
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
