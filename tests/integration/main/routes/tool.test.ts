import request from 'supertest';
import { IBackup } from 'pg-mem';

import { makeFakeDb } from '@/../tests/mocks';
import { MongoHelper } from '@/infra/db/mongo/helpers';
import { PgConnection } from '@/infra/db/postgres/helpers';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';

describe('ToolRoutes', () => {
  let backup: IBackup;

  beforeAll(async () => {
    await MongoHelper.getInstance().connect(env.mongoUrl);

    const db = await makeFakeDb();

    backup = db.backup();
  });

  afterAll(async () => {
    await MongoHelper.getInstance().disconnect();

    await PgConnection.getInstance().disconnect();
  });

  beforeEach(() => {
    backup.restore();
  });
  describe('POST /tool', () => {
    const requestData = {
      title: 'any_title',
      link: 'any_link',
      description: 'any_description',
      tags: ['any_tag'],
    };

    it('should return 200 with id and createdAt', async () => {
      const { body } = await request(app)
        .post('/api/tool')
        .send(requestData)
        .expect(200);

      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('createdAt');
    });

    it('should return 400 if tool name already exists', async () => {
      await request(app).post('/api/tool').send(requestData).expect(200);

      const { body } = await request(app)
        .post('/api/tool')
        .send(requestData)
        .expect(400);

      expect(body).toEqual({
        error: 'Tool already use',
      });
    });
  });
});
