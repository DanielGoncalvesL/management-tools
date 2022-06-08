import { Logger } from '@/domain/contracts/providers';
import { SignInUser } from '@/domain/use-cases';
import { HttpResponse, ok, unauthorized } from '@/application/helpers';
import { ValidationBuilder, Validator } from '@/application/validation';
import { Controller } from '@/application/controllers';

type HttpRequest = {
  email: string;
  password: string;
};

type Model = Error | { accessToken: string };

export class SignInUserController extends Controller {
  constructor(logger: Logger, private readonly signInUser: SignInUser) {
    super(logger);
  }

  async perform({
    email,
    password,
  }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const { accessToken } = await this.signInUser({
        email,
        password,
      });

      return ok({ accessToken });
    } catch (error) {
      return unauthorized(error as Error);
    }
  }

  override buildValidators({ email, password }: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of()
        .required({
          fields: [
            { value: email, name: 'email' },
            { value: password, name: 'password' },
          ],
        })
        .build(),

      ...ValidationBuilder.of()
        .validateEmail({ field: { value: email, name: 'email' } })
        .build(),
    ];

    return validators;
  }
}
