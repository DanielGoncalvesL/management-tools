import request from 'supertest';
import server from '@shared/infra/http/server';
import { createConnection, Connection, getConnection } from 'typeorm';

let connection: Connection;
describe('authenticate', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  it('should be authenticated when making the request in the post route', async () => {
    await request(server).post('/tools').send().expect(401);
  });

  it('should be authenticated when making the request in the get route', async () => {
    await request(server).get('/tools').expect(401);
  });

  it('should be authenticated when making the request in the delete route', async () => {
    await request(server).delete('/tools').send().expect(401);
  });
});

/**
schema json
autenticação
cadastro c sucesso
400 - tool already exists
 */
