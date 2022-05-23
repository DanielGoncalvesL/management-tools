import { InvalidParamError } from '@/application/errors';
import { Validator } from '@/application/validation';
import { Field } from '@/application/validation/field';

export class EmailValidator implements Validator {
  readonly emailRegex = /\S+@\S+\.\S+/;

  constructor(private readonly email: Field) {}

  validate(): Error | undefined {
    if (!this.emailRegex.test(this.email.value)) {
      return new InvalidParamError(this.email.name);
    }
  }
}
