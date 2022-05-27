import { CompareFieldsError } from '@/application/errors';
import { CompareFieldsValidator, Field } from '@/application/validation';

describe('CompareFieldsValidator', () => {
  let field: Field;
  let compareField: Field;

  beforeEach(() => {
    field = {
      name: 'field',
      value: 'any_field',
    };

    compareField = {
      name: 'compareField',
      value: 'any_field',
    };
  });

  it('should return CompareFieldsError if value is not equal', () => {
    compareField.value = 'different_field';

    const sut = new CompareFieldsValidator(field, compareField);

    const error = sut.validate();

    expect(error).toEqual(
      new CompareFieldsError(field.name, compareField.name),
    );
  });

  it('should return undefined if value is equal', () => {
    const sut = new CompareFieldsValidator(field, compareField);

    const error = sut.validate();

    expect(error).toBe(undefined);
  });
});
