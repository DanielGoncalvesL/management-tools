import request from 'supertest';
import faker from 'faker';
import server from '@shared/infra/http/server';
import { createConnection, Connection, getConnection } from 'typeorm';

let token: string;
let connection: Connection;
describe('POST /tools', () => {
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

  it('should be able to register a tool', async () => {
    const tool = {
      title: faker.name.title(),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: [faker.random.word()],
    }

    const { body } = await request(server).post('/tools')
      .send(tool)
      .set('authorization', `Bearer ${token}`)
      .expect(201);

    expect(body.title).toEqual(tool.title);
    expect(body.link).toEqual(tool.link);
    expect(body.description).toEqual(tool.description);
    expect(body.tags).toEqual(tool.tags);
    expect(body).toHaveProperty('id');
  });

  it('should not be able to register a tool when exist tool with same title', async () => {
    const tool = {
      title: faker.name.title(),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: [faker.random.word()],
    }

    await request(server).post('/tools')
      .send(tool)
      .set('authorization', `Bearer ${token}`)
      .expect(201);

    const { body } = await request(server).post('/tools')
      .send(tool)
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      message: 'Tool already exists',
      status: 'error',
    });
  });
});

/**
schema json
autenticação
cadastro c sucesso
400 - tool already exists
 */
