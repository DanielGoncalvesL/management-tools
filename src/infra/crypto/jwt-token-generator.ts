import { sign, verify } from 'jsonwebtoken';
import { TokenGenerator, TokenValidator } from '@/domain/contracts/providers';

type generateParams = TokenGenerator.Params;

export class JwtTokenGenerator implements TokenGenerator, TokenValidator {
  constructor(private readonly secret: string) {}

  async decrypt({
    token,
  }: TokenValidator.Params): Promise<TokenValidator.Result> {
    try {
      const decode: any = verify(token, this.secret);

      return { key: decode.key };
    } catch (error) {
      return false;
    }
  }

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
