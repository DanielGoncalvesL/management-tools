import { RequiredStringValidator } from '@/application/validation';
import { ValidationBuilder } from '@/application/validation/builder';

describe('ValidationBuilder', () => {
  it('should return a RequiredStringValidator', () => {
    const validators = ValidationBuilder.of()
      .required({
        fields: [{ value: 'any_value', name: 'any_name' }],
      })
      .build();

    expect(validators).toEqual([
      new RequiredStringValidator([{ value: 'any_value', name: 'any_name' }]),
    ]);
  });
});
