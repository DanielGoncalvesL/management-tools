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
    fakeBcrypt.compare.mockImplementation(() => true);
  });

  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });
  describe('hash', () => {
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

  describe('compare', () => {
    const compareDatas = {
      plaintext: 'any_password',
      textToCompare: 'hashed_password',
    };

    it('should call compare with correct params', async () => {
      await sut.compare(compareDatas);

      expect(fakeBcrypt.compare).toHaveBeenCalledTimes(1);
      expect(fakeBcrypt.compare).toHaveBeenCalledWith(
        compareDatas.plaintext,
        compareDatas.textToCompare,
      );
    });

    it('should return true if compare success', async () => {
      const compare = await sut.compare(compareDatas);

      expect(compare).toBeTruthy();
    });

    it('should return false if compare fails', async () => {
      fakeBcrypt.compare.mockImplementationOnce(() => false);

      const compare = await sut.compare(compareDatas);

      expect(compare).toBeFalsy();
    });

    it('should throw if compare throws', async () => {
      fakeBcrypt.compare.mockImplementationOnce(throwError);

      const promise = sut.compare(compareDatas);

      await expect(promise).rejects.toThrow();
    });
  });
});
