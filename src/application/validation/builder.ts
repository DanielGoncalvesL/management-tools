import { RequiredStringValidator, Validator } from '@/application/validation';

type RequiredParams = { value: string; fieldName: string };

export class ValidationBuilder {
  private constructor(private readonly validators: Validator[] = []) {}

  static of(): ValidationBuilder {
    return new ValidationBuilder();
  }

  required({ value, fieldName }: RequiredParams): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(value, fieldName));

    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
