import request from 'supertest';
import { app } from '@/main/config/app';
import { makeFakeDb } from '@/../tests/mocks';
import { IBackup } from 'pg-mem';
import { MongoHelper } from '@/infra/db/mongo/helpers';
import { env } from '@/main/config/env';
import { PgConnection } from '@/infra/db/postgres/helpers';

describe('SignInUser Routes', () => {
  let backup: IBackup;
  let connection: PgConnection;

  beforeAll(async () => {
    await MongoHelper.getInstance().connect(env.mongoUrl);

    connection = PgConnection.getInstance();

    const db = await makeFakeDb();

    backup = db.backup();
  });

  afterAll(async () => {
    await MongoHelper.getInstance().disconnect();

    await connection.disconnect();
  });

  beforeEach(() => {
    backup.restore();
  });

  describe('POST /signin', () => {
    const createUserDatas = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    };

    it('should return 200 with AccessToken', async () => {
      await request(app).post('/api/signup').send(createUserDatas).expect(200);

      const { body } = await request(app)
        .post('/api/signin')
        .send({
          email: createUserDatas.email,
          password: createUserDatas.password,
        })
        .expect(200);

      expect(body).toHaveProperty('accessToken');
    });

    it('should return 401 if credentials are not valid', async () => {
      const { body } = await request(app)
        .post('/api/signin')
        .send({
          email: 'invalid_email@mail.com',
          password: 'invalid_password',
        })
        .expect(401);

      expect(body).toEqual({
        error: 'Incorrect email/password combination',
      });
    });
  });
});
