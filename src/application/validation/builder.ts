import { RequiredStringValidator, Validator } from '@/application/validation';

export class ValidationBuilder {
  private constructor(private readonly validators: Validator[] = []) {}

  static of(): ValidationBuilder {
    return new ValidationBuilder();
  }

  required(params: { value: string; fieldName: string }): ValidationBuilder {
    this.validators.push(
      new RequiredStringValidator(params.value, params.fieldName),
    );

    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
