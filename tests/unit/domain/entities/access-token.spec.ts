import { AccessToken } from '@/domain/entities/access-token';

describe('AccessToken', () => {
  it('should expire in 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toEqual(1800000);
  });
});
