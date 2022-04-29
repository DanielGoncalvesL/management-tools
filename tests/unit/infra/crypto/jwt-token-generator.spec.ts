import { TokenGenerator } from '@/data/contracts/providers';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

class JwtTokenGenerator {
  constructor(private readonly secret: string) {}

  async generateToken(params: TokenGenerator.Params): Promise<void> {
    const expirationInSeconds = params.expirationInMs / 1000;

    jwt.sign({ key: params.key }, this.secret, {
      expiresIn: expirationInSeconds,
    });
  }
}

describe('JwtTokenGenerator', () => {
  let sut: JwtTokenGenerator;
  let fakeJwt: jest.Mocked<typeof jwt>;

  const secret = 'any_secret';

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>;
  });

  beforeEach(() => {
    sut = new JwtTokenGenerator(secret);
  });

  it('should call sign with correct params', async () => {
    await sut.generateToken({ key: 'any_key', expirationInMs: 1000 });

    expect(fakeJwt.sign).toHaveBeenCalledWith({ key: 'any_key' }, secret, {
      expiresIn: 1,
    });
  });
});
