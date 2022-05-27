import { MinimumSizeError } from '@/application/errors';
import { Field } from '@/application/validation';
import { MinimumSizeValidator } from '@/application/validation/minimun-size';

describe('MinimumSizeValidator', () => {
  let field: Field;
  let min: number;

  beforeEach(() => {
    field = {
      name: 'field',
      value: 'valid_size',
    };

    min = 6;
  });

  it('should return MinimumSizeError if value is less than minimum required', () => {
    field.value = 'error';

    const sut = new MinimumSizeValidator(field, min);

    const error = sut.validate();

    expect(error).toEqual(
      new MinimumSizeError({ name: field.name, size: min }),
    );
  });

  it('should return undefined if value is equal than minimum required', () => {
    field.value = 'valid_';

    const sut = new MinimumSizeValidator(field, min);

    const error = sut.validate();

    expect(error).toBeUndefined();
  });

  it('should return undefined if value is greater the minimum', () => {
    const sut = new MinimumSizeValidator(field, min);

    const error = sut.validate();

    expect(error).toBe(undefined);
  });
});
