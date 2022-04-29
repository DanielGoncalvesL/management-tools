import { EmailAlreadyUseError } from '@/domain/errors';

describe('EmailAlreadyUseError', () => {
  it('should be able to return correct name and message', () => {
    const error = new EmailAlreadyUseError();

    expect(error.name).toBe('EmailAlreadyUseError');
    expect(error.message).toBe('SignUp failed: Email already use');
  });
});
