import request from 'supertest';
import faker from 'faker';
import server from '@shared/infra/http/server';
import { createConnection, Connection, getConnection } from 'typeorm';

let token: string;
let connection: Connection;
describe('GET /tools', () => {
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

  it('should be able to find all tools', async () => {
    const { body } = await request(server).get('/tools')
      .set('authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray([body])).toBeTruthy();
  });

  it('should be able to find  tools when a tag is passed', async () => {
    const tag = `${faker.random.word()}${faker.random.word()}`

    const tool = {
      title: faker.name.title(),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: [tag],
    }

    await request(server).post('/tools')
      .send(tool)
      .set('authorization', `Bearer ${token}`)
      .expect(201);

    const { body } = await request(server).get('/tools')
      .query({ tag })
      .set('authorization', `Bearer ${token}`)
      .expect(200);

    expect(body[0]).toHaveProperty('id');
    expect(body[0].title).toEqual(tool.title);
    expect(body[0].link).toEqual(tool.link);
    expect(body[0].description).toEqual(tool.description);
    expect(body[0].tags[0]).toEqual(tag);
  });
});

/**
schema json
autenticação
cadastro c sucesso
400 - tool already exists
 */
