import request from 'supertest';
import { app } from '@/main/config/app';
import { makeFakeDb } from '@/../tests/mocks';
import { IBackup } from 'pg-mem';
import { getConnection } from 'typeorm';

describe('SignupUser Routes', () => {
  let backup: IBackup;

  beforeAll(async () => {
    const db = await makeFakeDb();

    backup = db.backup();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  beforeEach(() => {
    backup.restore();
  });

  describe('POST /signup', () => {
    it('should return 200 with AccessToken', async () => {
      const { body } = await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email',
          password: 'any_password',
        })
        .expect(200);

      expect(body).toHaveProperty('accessToken');
    });

    it('should return 200 with AccessToken', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email',
          password: 'any_password',
        })
        .expect(200);

      const { body } = await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email',
          password: 'any_password',
        })
        .expect(401);

      expect(body).toEqual({
        error: 'Unauthorized',
      });
    });
  });
});
