import { RequiredStringValidator } from '@/application/validation';
import { ValidationBuilder } from '@/application/validation/builder';

describe('ValidationBuilder', () => {
  it('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder.of()
      .required({
        value: 'any_value',
        fieldName: 'any_name',
      })
      .build();

    expect(validators).toEqual([
      new RequiredStringValidator('any_value', 'any_name'),
    ]);
  });
});
