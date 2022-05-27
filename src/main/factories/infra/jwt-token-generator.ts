import { JwtTokenGenerator } from '@/infra/crypto';
import { env } from '@/main/config/env';

export const makeJwtTokenGenerator = (): JwtTokenGenerator =>
  new JwtTokenGenerator(env.jwtSecret);
