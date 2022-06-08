import { SignInError } from '@/domain/entities/errors';

describe('SignInError', () => {
  it('should be able to return correct name and message', () => {
    const error = new SignInError();

    expect(error.name).toBe('SignInError');
    expect(error.message).toBe('Incorrect email/password combination');
  });
});
