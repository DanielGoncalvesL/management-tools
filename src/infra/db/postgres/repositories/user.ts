import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/domain/contracts/repositories';
import { PgUser } from '@/infra/db/postgres/entities';
import { getRepository, Repository } from 'typeorm';

type createParams = CreateUserRepository.Params;
type createResult = CreateUserRepository.Result;

type checkParams = CheckUserByEmailRepository.Params;
type checkResult = CheckUserByEmailRepository.Result;

export class PgUserRepository
  implements CheckUserByEmailRepository, CreateUserRepository
{
  private getUserRepository(): Repository<PgUser> {
    return getRepository(PgUser);
  }

  async createUser({
    email,
    name,
    password,
  }: createParams): Promise<createResult> {
    const pgUserRepo = this.getUserRepository();

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
    const pgUserRepo = this.getUserRepository();

    return !!(await pgUserRepo.findOne({
      where: { email },
    }));
  }
}
