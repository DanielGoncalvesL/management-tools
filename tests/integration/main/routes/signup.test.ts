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
    const requestData = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    };

    it('should return 200 with AccessToken', async () => {
      const { body } = await request(app)
        .post('/api/signup')
        .send(requestData)
        .expect(200);

      expect(body).toHaveProperty('accessToken');
    });

    it('should return 401 if email already exists', async () => {
      await request(app).post('/api/signup').send(requestData).expect(200);

      const { body } = await request(app)
        .post('/api/signup')
        .send(requestData)
        .expect(400);

      expect(body).toEqual({
        error: 'SignUp failed: Email already use',
      });
    });
  });
});
