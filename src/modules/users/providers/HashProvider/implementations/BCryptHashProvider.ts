import { hash, compare } from 'bcryptjs'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class BCryptHashProviders implements IHashProvider {
  public async generateHash(decrypted:string):Promise<string> {
    return hash(decrypted, 8);
  }

  public async compareHash(decrypted:string, hashed: string):Promise<boolean> {
    return compare(decrypted, hashed);
  }
}
