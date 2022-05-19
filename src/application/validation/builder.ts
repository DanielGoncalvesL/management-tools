import {
  RequiredStringValidator,
  Validator,
  CompareFieldsValidator,
} from '@/application/validation';

type RequiredParams = { value: string; fieldName: string };
type CompareFieldsParams = { field: string; compareField: string };

export class ValidationBuilder {
  private constructor(private readonly validators: Validator[] = []) {}

  static of(): ValidationBuilder {
    return new ValidationBuilder();
  }

  required({ value, fieldName }: RequiredParams): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(value, fieldName));

    return this;
  }

  compare({ field, compareField }: CompareFieldsParams): ValidationBuilder {
    this.validators.push(new CompareFieldsValidator(field, compareField));

    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
