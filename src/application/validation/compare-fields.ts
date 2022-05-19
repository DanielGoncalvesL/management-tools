import { CompareFieldsError } from '@/application/errors';
import { Validator } from '@/application/validation';

export class CompareFieldsValidator implements Validator {
  constructor(
    private readonly field: string,
    private readonly compareField: string,
  ) {}

  validate(): Error | undefined {
    if (this.field !== this.compareField) {
      return new CompareFieldsError(this.field, this.compareField);
    }
  }
}
