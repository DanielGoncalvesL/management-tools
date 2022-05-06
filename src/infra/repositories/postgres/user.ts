import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/data/contracts/repositories';
import { getRepository, Repository } from 'typeorm';
import { PgUser } from './entities';

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

  private readonly pgUserRepo = this.getUserRepository();

  async createUser({
    email,
    name,
    password,
  }: createParams): Promise<createResult> {
    const user = await this.pgUserRepo.save(
      this.pgUserRepo.create({
        name: name,
        email: email,
        password: password,
      }),
    );

    return { id: user.id };
  }

  async checkByEmail({ email }: checkParams): Promise<checkResult> {
    return !!(await this.pgUserRepo.findOne({
      where: { email: email },
    }));
  }
}
