import {
  CheckUserByEmailRepository,
  CheckUserById,
  CreateUserRepository,
  LoadByEmailRepository,
} from '@/domain/contracts/repositories';
import { PgUser } from '@/infra/db/postgres/entities';
import { PgRepository } from '@/infra/db/postgres/repositories/repository';

type createParams = CreateUserRepository.Params;
type createResult = CreateUserRepository.Result;

type checkParams = CheckUserByEmailRepository.Params;
type checkResult = CheckUserByEmailRepository.Result;

type loadByEmailParams = LoadByEmailRepository.Params;
type loadByEmailResult = LoadByEmailRepository.Result;

export class PgUserRepository
  extends PgRepository
  implements
    CheckUserByEmailRepository,
    CreateUserRepository,
    LoadByEmailRepository,
    CheckUserById
{
  async checkById({ id }: CheckUserById.Params): Promise<boolean> {
    const pgUserRepo = this.getRepository(PgUser);

    const isExisted = await pgUserRepo.findOne({ where: { id } });

    return !!isExisted;
  }

  async loadByEmail({ email }: loadByEmailParams): Promise<loadByEmailResult> {
    const pgUserRepo = this.getRepository(PgUser);

    const user = await pgUserRepo.findOne({ where: { email } });

    if (!user) {
      return undefined;
    }

    return {
      id: user.id,
      password: user.password,
    };
  }

  async createUser({
    email,
    name,
    password,
  }: createParams): Promise<createResult> {
    const pgUserRepo = this.getRepository(PgUser);

    const user = await pgUserRepo.save(
      pgUserRepo.create({
        name,
        email,
        password,
      }),
    );

    return { id: user.id };
  }

  async checkByEmail({ email }: checkParams): Promise<checkResult> {
    const pgUserRepo = this.getRepository(PgUser);

    return !!(await pgUserRepo.findOne({
      where: { email },
    }));
  }
}
