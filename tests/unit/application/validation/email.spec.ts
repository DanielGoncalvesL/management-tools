import { InvalidParamError } from '@/application/errors';
import { EmailValidator, Field } from '@/application/validation';

describe('EmailValidator', () => {
  let email: Field;

  beforeEach(() => {
    email = {
      name: 'field',
      value: 'valid_email@mail.com',
    };
  });

  it('should ensure that the email regex is valid', () => {
    const sut = new EmailValidator(email);

    expect(sut.emailRegex).toEqual(/\S+@\S+\.\S+/);
  });

  it('should return InvalidParamError if value is not valid', () => {
    email.value = 'invalid_email';

    const sut = new EmailValidator(email);

    const error = sut.validate();

    expect(error).toEqual(new InvalidParamError(email.name));
  });

  it('should return undefined if value is valid', () => {
    const sut = new EmailValidator(email);

    const error = sut.validate();

    expect(error).toBe(undefined);
  });
});
