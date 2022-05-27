import { RequiredFieldError } from '@/application/errors';
import { RequiredStringValidator } from '@/application/validation';

describe('RequiredStringValidator', () => {
  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredStringValidator([{ value: '', name: 'any_field' }]);

    const error = sut.validate();

    expect(error).toEqual(new RequiredFieldError('any_field'));
  });

  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiredStringValidator([
      { value: null as any, name: 'any_field' },
    ]);

    const error = sut.validate();

    expect(error).toEqual(new RequiredFieldError('any_field'));
  });

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredStringValidator([
      { value: undefined as any, name: 'any_field' },
    ]);

    const error = sut.validate();

    expect(error).toEqual(new RequiredFieldError('any_field'));
  });

  it('should return undefined if value is not empty', () => {
    const sut = new RequiredStringValidator([
      { value: 'any_value', name: 'any_field' },
    ]);

    const error = sut.validate();

    expect(error).toBe(undefined);
  });
});
