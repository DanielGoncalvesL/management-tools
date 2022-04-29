import { CheckUserByEmailRepository } from '@/data/contracts/repositories';
import { getRepository } from 'typeorm';
import { PgUser } from './entities';

export class PgUserRepository implements CheckUserByEmailRepository {
  async checkByEmail(
    params: CheckUserByEmailRepository.Params,
  ): Promise<CheckUserByEmailRepository.Result> {
    const pgUserRepo = getRepository(PgUser);

    return !!(await pgUserRepo.findOne({ where: { email: params.email } }));
  }
}
