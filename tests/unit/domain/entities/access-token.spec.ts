import { AccessToken } from '@/domain/entities/access-token';

describe('AccessToken', () => {
  it('should create with a value', () => {
    const sut = new AccessToken('any_value');

    expect(sut).toEqual({ value: 'any_value' });
  });

  it('should expire in 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toEqual(1800000);
  });
});
