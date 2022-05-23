import {
  RequiredStringValidator,
  Validator,
  CompareFieldsValidator,
  Field,
} from '@/application/validation';
import { MinimumSizeValidator } from '@/application/validation/minimun-size';

type RequiredParams = { value: string; fieldName: string };
type CompareFieldsParams = { field: Field; compareField: Field };
type MinimumSizeParams = { field: Field; min: number };

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

  min({ field, min }: MinimumSizeParams): ValidationBuilder {
    this.validators.push(new MinimumSizeValidator(field, min));

    return this;
  }

  build(): Validator[] {
    return this.validators;
  }
}
