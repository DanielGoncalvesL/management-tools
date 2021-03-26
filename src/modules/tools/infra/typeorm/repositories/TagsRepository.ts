import { getRepository, Repository } from 'typeorm';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import Tag from '@modules/tools/infra/typeorm/entities/Tag';

export default class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async findTagByName(name : string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne({
      where: { name },
    });

    return tag;
  }

  public async create(name: string): Promise<Tag> {
    const tag = this.ormRepository.create({
      name,
    });

    return this.ormRepository.save(tag);
  }

  public async save(tag: Tag): Promise<Tag> {
    return this.ormRepository.save(tag);
  }
}
