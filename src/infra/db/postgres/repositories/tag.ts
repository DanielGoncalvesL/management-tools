import { CreateTagRepository } from '@/domain/contracts/repositories';
import { Tag } from '@/domain/entities';
import { PgTag } from '@/infra/db/postgres/entities';
import { PgRepository } from '@/infra/db/postgres/repositories/repository';

type createParams = CreateTagRepository.Params;
type createResult = CreateTagRepository.Result;

export class PgTagRepository
  extends PgRepository
  implements CreateTagRepository
{
  async create({ names }: createParams): Promise<createResult> {
    const ormRepository = this.getRepository(PgTag);

    const objects = names.map(name => {
      return ormRepository.create({ name });
    });

    const { generatedMaps } = await ormRepository
      .createQueryBuilder()
      .insert()
      .into(PgTag)
      .values(objects)
      .orIgnore()
      .returning(['name'])
      .execute();

    const createdTags = generatedMaps as Tag[];

    const tags = [];

    for (const tag of createdTags) {
      tags.push(new Tag(tag.id, tag.name, tag.createdAt));
    }

    return tags;
  }
}
