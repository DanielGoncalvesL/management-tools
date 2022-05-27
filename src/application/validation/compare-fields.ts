import { CompareFieldsError } from '@/application/errors';
import { Validator, Field } from '@/application/validation';

export class CompareFieldsValidator implements Validator {
  constructor(
    private readonly field: Field,
    private readonly compareField: Field,
  ) {}

  validate(): Error | undefined {
    if (this.field.value !== this.compareField.value) {
      return new CompareFieldsError(this.field.name, this.compareField.name);
    }

    return undefined;
  }
}
