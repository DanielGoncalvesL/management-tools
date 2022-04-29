import { DataType, newDb } from 'pg-mem';
import { v4 } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  getRepository,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CheckUserByEmailRepository } from '@/data/contracts/repositories';

class PgUserRepository implements CheckUserByEmailRepository {
  async checkByEmail(
    params: CheckUserByEmailRepository.Params,
  ): Promise<CheckUserByEmailRepository.Result> {
    const pgUserRepo = getRepository(PgUser);

    return !!(await pgUserRepo.findOne({ where: { email: params.email } }));
  }
}

describe('PgUserRepository', () => {
  describe('CheckUserByEmailRepository', () => {
    it('should return true if user exists', async () => {
      const db = newDb();
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser],
      });

      db.registerExtension('uuid-ossp', schema => {
        schema.registerFunction({
          name: 'uuid_generate_v4',
          returns: DataType.uuid,
          implementation: v4,
          impure: true,
        });
      });

      db.public.query(
        'create extension "uuid-ossp"; select uuid_generate_v4();',
      );

      await connection.synchronize();

      const pgUserRepo = getRepository(PgUser);

      await pgUserRepo.save(
        pgUserRepo.create({
          name: 'any_name',
          email: 'existing_email',
          password: 'any_password',
        }),
      );

      const sut = new PgUserRepository();

      const isExisted = await sut.checkByEmail({ email: 'existing_email' });

      expect(isExisted).toBeTruthy();

      const user = await pgUserRepo.find();

      expect(user).toHaveLength(1);
      expect(user[0]).toHaveProperty('id');
      expect(user[0]).toHaveProperty('name', 'any_name');
      expect(user[0]).toHaveProperty('email', 'existing_email');
      expect(user[0]).toHaveProperty('password', 'any_password');
      expect(user[0]).toHaveProperty('createdAt');
      expect(user[0]).toHaveProperty('updatedAt');
    });
  });

  describe('CreateUserRepository', () => {});
});

@Entity({ name: 'user' })
export class PgUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
