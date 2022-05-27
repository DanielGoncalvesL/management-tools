import { ValidationComposite, Validator } from '@/application/validation';
import { mock, MockProxy } from 'jest-mock-extended';

describe('ValidationComposite', () => {
  let sut: ValidationComposite;
  let validator1: MockProxy<Validator>;
  let validator2: MockProxy<Validator>;
  let validators: Validator[];

  beforeEach(() => {
    validator1 = mock();
    validator1.validate.mockReturnValue(undefined);

    validator2 = mock();
    validator2.validate.mockReturnValue(undefined);

    validators = [validator1, validator2];

    sut = new ValidationComposite(validators);
  });

  it('should return undefined if all Validators return undefined', () => {
    const error = sut.validate();

    expect(error).toBeUndefined();
  });

  it('should return the first error', () => {
    const error1 = new Error('validation_error1');
    const error2 = new Error('validation_error2');

    validator1.validate.mockReturnValueOnce(error1);
    validator2.validate.mockReturnValueOnce(error2);
    const error = sut.validate();

    expect(error).toEqual(error1);
  });

  it('should return the second error', () => {
    const error2 = new Error('validation_error2');

    validator2.validate.mockReturnValueOnce(error2);
    const error = sut.validate();

    expect(error).toEqual(error2);
  });
});
