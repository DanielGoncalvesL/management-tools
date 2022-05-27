import { IMemoryDb, DataType, newDb } from 'pg-mem';
import { v4 } from 'uuid';

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb();

  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? [
      'src/infra/db/repositories/postgres/entities/index.ts',
    ],
  });

  db.registerExtension('uuid-ossp', schema => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  db.public.query('create extension "uuid-ossp"; select uuid_generate_v4();');

  await connection.synchronize();

  return db;
};
