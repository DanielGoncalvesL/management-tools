import { Hasher } from '@/data/contracts/providers';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  async hash({ plaintext }: Hasher.Params): Promise<Hasher.Result> {
    return bcrypt.hash(plaintext, this.salt);
  }
}
