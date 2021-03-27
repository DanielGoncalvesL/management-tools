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

  it('should inform that id must be a valid GUID', async () => {
    const { body } = await request(server).delete(`/tools/${faker.random.word()}`)
      .set('authorization', `Bearer ${token}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'id must be a valid GUID',
    });
  });

  it('should inform that id must be mandatory', async () => {
    await request(server).delete('/tools')
      .set('authorization', `Bearer ${token}`)
      .expect(404);
  });
});

/**
schema json
autenticação
cadastro c sucesso
400 - tool already exists
 */
