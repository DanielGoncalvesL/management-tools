import { RequiredFieldError } from '@/application/errors';
import { Validator } from '@/application/validation';
import { Field } from '@/application/validation/field';

export class RequiredStringValidator implements Validator {
  constructor(private readonly fields: Field[]) {}

  validate(): Error | undefined {
    for (const field of this.fields) {
      if (
        field.value === '' ||
        field.value === null ||
        field.value === undefined
      ) {
        return new RequiredFieldError(field.name);
      }
    }

    return undefined;
  }
}
