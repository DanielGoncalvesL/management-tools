import { IBackup } from 'pg-mem';
import { getConnection, getRepository, Repository } from 'typeorm';
import { validate } from 'uuid';

import { PgUser } from '@/infra/repositories/postgres/entities';
import { makeFakeDb } from '@/tests/mocks';
import { PgUserRepository } from '@/infra/repositories/postgres';

describe('PgUserRepository', () => {
  let sut: PgUserRepository;
  let pgUserRepo: Repository<PgUser>;
  let backup: IBackup;

  beforeAll(async () => {
    const db = await makeFakeDb();

    backup = db.backup();

    pgUserRepo = getRepository(PgUser);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  beforeEach(() => {
    backup.restore();

    sut = new PgUserRepository();
  });

  describe('CheckUserByEmailRepository', () => {
    it('should return true if user exists', async () => {
      await pgUserRepo.save(
        pgUserRepo.create({
          name: 'any_name',
          email: 'existing_email',
          password: 'any_password',
        }),
      );

      const isExisted = await sut.checkByEmail({ email: 'existing_email' });

      expect(isExisted).toBeTruthy();

      const user = await pgUserRepo.find();

      expect(user).toHaveLength(1);
      expect(user[0]).toHaveProperty('id');
      expect(validate(user[0].id)).toBeTruthy();
      expect(typeof user[0].id).toBe('string');
      expect(user[0]).toHaveProperty('name', 'any_name');
      expect(user[0]).toHaveProperty('email', 'existing_email');
      expect(user[0]).toHaveProperty('password', 'any_password');
      expect(user[0]).toHaveProperty('createdAt');
      expect(user[0]).toHaveProperty('updatedAt');
    });

    it('should return false if user not exists', async () => {
      const isExisted = await sut.checkByEmail({ email: 'existing_email' });

      expect(isExisted).toBeFalsy();
    });
  });

  describe('CreateUserRepository', () => {
    it('should create an user', async () => {
      const { id } = await sut.createUser({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      });

      expect(id).toBeTruthy();
      expect(validate(id)).toBeTruthy();
      expect(typeof id).toBe('string');
    });
  });
});
