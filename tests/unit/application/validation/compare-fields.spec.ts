import { CompareFieldsError } from '@/application/errors';
import { CompareFieldsValidator } from '@/application/validation';

describe('CompareFieldsValidator', () => {
  it('should return CompareFieldsError if value is not equal', () => {
    const fields = {
      field: 'any_field',
      compareField: 'different_field',
    };

    const sut = new CompareFieldsValidator(fields.field, fields.compareField);

    const error = sut.validate();

    expect(error).toEqual(
      new CompareFieldsError(fields.field, fields.compareField),
    );
  });

  it('should return undefined if value is equal', () => {
    const sut = new CompareFieldsValidator('any_field', 'any_field');

    const error = sut.validate();

    expect(error).toBe(undefined);
  });
});
