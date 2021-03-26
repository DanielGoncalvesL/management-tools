import Tag from '@modules/tools/infra/typeorm/entities/Tag';

export default interface ITagsRepository{
  findTagByName(name: string): Promise<Tag | undefined>;
  create(name: string): Promise<Tag>;
  save(tag: Tag): Promise<Tag>;
}
