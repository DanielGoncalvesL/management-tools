import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/domain/contracts/repositories';
import { PgUser } from '@/infra/db/postgres/entities';
import { PgRepository } from '@/infra/db/postgres/repositories/repository';

type createParams = CreateUserRepository.Params;
type createResult = CreateUserRepository.Result;

type checkParams = CheckUserByEmailRepository.Params;
type checkResult = CheckUserByEmailRepository.Result;

export class PgUserRepository
  extends PgRepository
  implements CheckUserByEmailRepository, CreateUserRepository
{
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
