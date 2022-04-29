import {
  CheckUserByEmailRepository,
  CreateUserRepository,
} from '@/data/contracts/repositories';
import { getRepository, Repository } from 'typeorm';
import { PgUser } from './entities';

export class PgUserRepository
  implements CheckUserByEmailRepository, CreateUserRepository
{
  private getUserRepository(): Repository<PgUser> {
    return getRepository(PgUser);
  }

  private readonly pgUserRepo = this.getUserRepository();

  async createUser(
    params: CreateUserRepository.Params,
  ): Promise<CreateUserRepository.Result> {
    const user = await this.pgUserRepo.save(
      this.pgUserRepo.create({
        name: params.name,
        email: params.email,
        password: params.password,
      }),
    );

    return { id: user.id };
  }

  async checkByEmail(
    params: CheckUserByEmailRepository.Params,
  ): Promise<CheckUserByEmailRepository.Result> {
    return !!(await this.pgUserRepo.findOne({
      where: { email: params.email },
    }));
  }
}
