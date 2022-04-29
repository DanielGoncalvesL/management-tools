import { JwtTokenGenerator } from '@/infra/crypto';
import jwt from 'jsonwebtoken';
import { throwError } from '../../mocks';

jest.mock('jsonwebtoken');

describe('JwtTokenGenerator', () => {
  let sut: JwtTokenGenerator;
  let fakeJwt: jest.Mocked<typeof jwt>;

  const secret = 'any_secret';

  const generatedTokenData = {
    key: 'any_key',
    expirationInMs: 1000,
  };

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>;

    fakeJwt.sign.mockImplementation(() => 'any_token');
  });

  beforeEach(() => {
    sut = new JwtTokenGenerator(secret);
  });

  it('should call sign with correct params', async () => {
    await sut.generateToken(generatedTokenData);

    expect(fakeJwt.sign).toHaveBeenCalledWith({ key: 'any_key' }, secret, {
      expiresIn: 1,
    });
  });

  it('should return a token', async () => {
    const token = await sut.generateToken(generatedTokenData);

    expect(token).toBe('any_token');
  });

  it('should throw if sign throws', async () => {
    fakeJwt.sign.mockImplementationOnce(throwError);

    const promise = sut.generateToken(generatedTokenData);

    await expect(promise).rejects.toThrow();
  });
});
