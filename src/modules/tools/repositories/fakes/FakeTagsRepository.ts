import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import Tag from '@modules/tools/infra/typeorm/entities/Tag';
import { v4 as uuid } from 'uuid';

export default class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  public async findTagByName(name : string): Promise<Tag | undefined> {
    const findTagByName = this.tags.find((tag) => tag.name === name);

    return findTagByName;
  }

  public async create(name: string): Promise<Tag> {
    const tag = new Tag();

    Object.assign(tag, { id: uuid(), name });

    this.tags.push(tag);

    return this.save(tag);
  }

  public async save(tag: Tag): Promise<Tag> {
    const findIndex = this.tags.findIndex((findTag) => findTag.id === tag.id);

    this.tags[findIndex] = tag;

    return tag;
  }
}
