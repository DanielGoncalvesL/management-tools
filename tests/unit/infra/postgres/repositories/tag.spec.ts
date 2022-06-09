import { IBackup } from 'pg-mem';
import { Repository } from 'typeorm';

import { PgTag } from '@/infra/db/postgres/entities';
import { makeFakeDb } from '@/tests/mocks';
import { PgRepository } from '@/infra/db/postgres/repositories';
import { PgConnection } from '@/infra/db/postgres/helpers';
import { PgTagRepository } from '@/infra/db/postgres/repositories/tag';
import { Tag } from '@/domain/entities';

describe('PgTagRepository', () => {
  let sut: PgTagRepository;
  let connection: PgConnection;
  let pgTagRepo: Repository<PgTag>;
  let backup: IBackup;

  beforeAll(async () => {
    connection = PgConnection.getInstance();

    const db = await makeFakeDb();

    backup = db.backup();

    pgTagRepo = connection.getRepository(PgTag);
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  beforeEach(() => {
    backup.restore();

    sut = new PgTagRepository();
  });

  describe('CreateTagRepository', () => {
    it('should extend PgRepository', async () => {
      expect(sut).toBeInstanceOf(PgRepository);
    });

    it('should call create with correct params', async () => {
      const createSpy = jest.spyOn(pgTagRepo, 'create');

      await sut.create({ names: ['any_name', 'any_other_name'] });

      expect(createSpy).toHaveBeenCalledTimes(2);
      expect(createSpy).toHaveBeenCalledWith({ name: 'any_name' });
      expect(createSpy).toHaveBeenCalledWith({ name: 'any_other_name' });
    });

    it('should call createQueryBuilder with correct times', async () => {
      const queryBuilderSpy = jest.spyOn(pgTagRepo, 'createQueryBuilder');

      await sut.create({ names: ['any_name', 'any_other_name'] });

      expect(queryBuilderSpy).toHaveBeenCalledTimes(1);
    });

    it('should return Tags after insert data into db', async () => {
      const names = ['any_name', 'any_other_name'];

      const tags = await sut.create({ names });

      expect(tags).toHaveLength(2);

      for (let i = 0; i < tags.length; i += 1) {
        const tag = tags[i];

        expect(tag).toBeInstanceOf(Tag);
        expect(tag).toHaveProperty('id');
        expect(tag).toHaveProperty('name', names[i]);
        expect(tag).toHaveProperty('createdAt');
      }
    });
  });
});
