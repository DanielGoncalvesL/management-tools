import {
  CheckToolByTitleRepository,
  CreateToolRepository,
} from '@/domain/contracts/repositories';
import { PgTool } from '@/infra/db/postgres/entities';
import { PgRepository } from '@/infra/db/postgres/repositories/repository';

type createParams = CreateToolRepository.Params;
type createResult = CreateToolRepository.Result;

type checkByTitleParams = CheckToolByTitleRepository.Params;

export class PgToolRepository
  extends PgRepository
  implements CheckToolByTitleRepository, CreateToolRepository
{
  async checkByTitle({ title }: checkByTitleParams): Promise<boolean> {
    const ormRepository = this.getRepository(PgTool);

    return !!(await ormRepository.findOne({ where: { title } }));
  }

  async create({
    description,
    link,
    tags,
    title,
  }: createParams): Promise<createResult> {
    const ormRepository = this.getRepository(PgTool);

    const tool = await ormRepository.save(
      ormRepository.create({
        description,
        link,
        tags,
        title,
      }),
    );

    return tool;
  }
}
