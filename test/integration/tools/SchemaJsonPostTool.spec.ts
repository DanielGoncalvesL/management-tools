import request from 'supertest';
import faker from 'faker';
import server from '@shared/infra/http/server';
import { createConnection, Connection, getConnection } from 'typeorm';

let token: string;
let connection: Connection;
describe('/tools', () => {
  beforeAll(async () => {
    connection = await createConnection();
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    await request(server).post('/users').send(user).expect(201);
    const { body } = await request(server).post('/authenticate').send({
      email: user.email,
      password: user.password,
    })
    token = body.token
  });

  afterAll(async () => {
    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  it('should inform that title is mandatory when it is not sent', async () => {
    const { body } = await request(server).post('/tools').send({
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: [faker.random.word()],
    })
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'title is required',
    });
  });

  it('should inform that link is mandatory when it is not sent', async () => {
    const { body } = await request(server).post('/tools').send({
      title: faker.name.title(),
      description: faker.commerce.productDescription(),
      tags: [faker.random.word()],
    })
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'link is required',
    });
  });

  it('should inform that description is mandatory when it is not sent', async () => {
    const { body } = await request(server).post('/tools').send({
      title: faker.name.title(),
      link: faker.internet.url(),
      tags: [faker.random.word()],
    })
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'description is required',
    });
  });

  it('should inform that tags is mandatory when it is not sent', async () => {
    const { body } = await request(server).post('/tools').send({
      title: faker.name.title(),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
    })
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'tags is required',
    });
  });

  it('should inform that tags must be an array when it\'s an array', async () => {
    const { body } = await request(server).post('/tools').send({
      title: faker.name.title(),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: 'not-array',
    })
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'tags must be an array',
    });
  });

  it('should inform that tags must contain at least 1 items when is empty', async () => {
    const { body } = await request(server).post('/tools').send({
      title: faker.name.title(),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: [],
    })
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'tags must contain at least 1 items',
    });
  });

  it('should inform that more fields is not allowed', async () => {
    const { body } = await request(server).post('/tools').send({
      title: faker.name.title(),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: [faker.random.word()],
      moreField: faker.random.word(),
    })
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'moreField is not allowed',
    });
  });
});

/**
schema json
autenticação
cadastro c sucesso
400 - tool already exists
 */
