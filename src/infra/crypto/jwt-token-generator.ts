import { sign } from 'jsonwebtoken';
import { TokenGenerator } from '@/domain/contracts/providers';

type generateParams = TokenGenerator.Params;

export class JwtTokenGenerator implements TokenGenerator {
  constructor(private readonly secret: string) {}

  async generateToken({
    expirationInMs,
    key,
  }: generateParams): Promise<TokenGenerator.Result> {
    const expirationInSeconds = expirationInMs / 1000;

    return sign({ key }, this.secret, {
      expiresIn: expirationInSeconds,
    });
  }
}
