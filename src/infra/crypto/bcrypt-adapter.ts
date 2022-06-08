import { HashComparer, Hasher } from '@/domain/contracts/providers';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash({ plaintext }: Hasher.Params): Promise<Hasher.Result> {
    return bcrypt.hash(plaintext, this.salt);
  }

  async compare({
    plaintext,
    textToCompare,
  }: HashComparer.Params): Promise<HashComparer.Result> {
    return bcrypt.compare(plaintext, textToCompare);
  }
}
