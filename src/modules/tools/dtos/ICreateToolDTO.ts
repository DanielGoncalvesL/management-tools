import Tag from '@modules/tools/infra/typeorm/entities/Tag';

export default interface ICreateToolDTO {
  title: string,
  link: string,
  description: string,
  tags: Tag[],
}
