import {
  RequiredStringValidator,
  Validator,
  CompareFieldsValidator,
  Field,
} from '@/application/validation';
import { EmailValidator } from '@/application/validation/email';
import { MinimumSizeValidator } from '@/application/validation/minimun-size';

type RequiredParams = { fields: Field[] };
type CompareFieldsParams = { field: Field; compareField: Field };
type MinimumSizeParams = { field: Field; min: number };
type ValidateEmailParams = { field: Field };

export class ValidationBuilder {
  private constructor(private readonly validators: Validator[] = []) {}

  static of(): ValidationBuilder {
    return new ValidationBuilder();
  }

  required({ fields }: RequiredParams): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(fields));

    return this;
  }

  compare({ field, compareField }: CompareFieldsParams): ValidationBuilder {
    this.validators.push(new CompareFieldsValidator(field, compareField));

    return this;
  }

  min({ field, min }: MinimumSizeParams): ValidationBuilder {
    this.validators.push(new MinimumSizeValidator(field, min));

    return this;
  }

  validateEmail({ field }: ValidateEmailParams): ValidationBuilder {
    this.validators.push(new EmailValidator(field));

    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
