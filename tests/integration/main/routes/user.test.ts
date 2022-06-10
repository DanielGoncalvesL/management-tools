import request from 'supertest';
import { IBackup } from 'pg-mem';

import { makeFakeDb } from '@/../tests/mocks';
import { MongoHelper } from '@/infra/db/mongo/helpers';
import { PgConnection } from '@/infra/db/postgres/helpers';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';

describe('UserRoutes', () => {
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
  describe('SignupUser Routes', () => {
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

  describe('SignInUser Routes', () => {
    describe('POST /signin', () => {
      const createUserDatas = {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      };

      it('should return 200 with AccessToken', async () => {
        await request(app)
          .post('/api/signup')
          .send(createUserDatas)
          .expect(200);

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
});
