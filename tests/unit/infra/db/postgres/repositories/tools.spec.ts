import { IBackup } from 'pg-mem';
import { Repository } from 'typeorm';
import { validate } from 'uuid';

import { PgTag, PgTool } from '@/infra/db/postgres/entities';
import { makeFakeDb } from '@/tests/mocks';
import { PgRepository } from '@/infra/db/postgres/repositories';
import { PgConnection } from '@/infra/db/postgres/helpers';
import { Tag } from '@/domain/entities';
import { PgToolRepository } from '@/infra/db/postgres/repositories/tool';

describe('PgToolRepository', () => {
  let sut: PgToolRepository;
  let connection: PgConnection;
  let pgToolRepo: Repository<PgTool>;
  let pgTagRepo: Repository<PgTag>;
  let backup: IBackup;

  beforeAll(async () => {
    connection = PgConnection.getInstance();

    const db = await makeFakeDb();

    backup = db.backup();

    pgToolRepo = connection.getRepository(PgTool);
    pgTagRepo = connection.getRepository(PgTag);
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  beforeEach(() => {
    backup.restore();

    sut = new PgToolRepository();
  });
  it('should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository);
  });

  describe('CreateToolRepository', () => {
    let tag: Tag;
    const createObject = {
      description: 'any_description',
      link: 'any_link.com',
      title: 'any_title',
    };

    beforeEach(async () => {
      const savedTag = await pgTagRepo.save(
        pgTagRepo.create({ name: 'any_name' }),
      );

      tag = new Tag(savedTag.id, savedTag.name, savedTag.createdAt);
    });

    it('should return tool if it was been created', async () => {
      const tool = await sut.create({ ...createObject, tags: [tag] });

      expect(tool).toHaveProperty('id');
      expect(validate(tool.id)).toBeTruthy();

      expect(tool).toHaveProperty('description', createObject.description);
      expect(tool).toHaveProperty('link', createObject.link);
      expect(tool).toHaveProperty('tags', [tag]);
      expect(tool).toHaveProperty('title', createObject.title);
      expect(tool).toHaveProperty('createdAt');
    });
  });

  describe('CheckByTitleRepository', () => {
    it('should call findOne with correct params', async () => {
      const findOneSpy = jest.spyOn(pgToolRepo, 'findOne');

      await sut.checkByTitle({ title: 'any_title' });

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        where: { title: 'any_title' },
      });
    });

    it('should return false if tool not exists', async () => {
      const exists = await sut.checkByTitle({ title: 'invalid_title' });

      expect(exists).toBeFalsy();
    });

    it('should return true if tool exists', async () => {
      await pgToolRepo.save(
        pgToolRepo.create({
          description: 'any_description',
          link: 'any_link.com',
          title: 'any_title',
        }),
      );

      const exists = await sut.checkByTitle({ title: 'any_title' });

      expect(exists).toBeTruthy();
    });
  });
});
