import { BcryptAdapter } from '@/infra/crypto';
import bcrypt from 'bcrypt';
import { throwError } from '../../../mocks';

jest.mock('bcrypt');

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter;
  let fakeBcrypt: jest.Mocked<typeof bcrypt>;

  const salt = 12;

  const hashData = {
    plaintext: 'any_value',
  };

  beforeAll(() => {
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

    fakeBcrypt.hash.mockImplementation(() => 'any_hashed_value');
  });

  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });

  it('should call sign with correct params', async () => {
    await sut.hash(hashData);

    expect(fakeBcrypt.hash).toHaveBeenCalledWith(hashData.plaintext, salt);
  });

  it('should return a hashed value', async () => {
    const hashed = await sut.hash(hashData);

    expect(hashed).toBe('any_hashed_value');
  });

  it('should throw if hash throws', async () => {
    fakeBcrypt.hash.mockImplementationOnce(throwError);

    const promise = sut.hash(hashData);

    await expect(promise).rejects.toThrow();
  });
});
