import Tag from '@modules/tools/infra/typeorm/entities/Tag';
// import AppError from '@shared/errors/AppError';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest{
   tags: string[];
}

@injectable()
export default class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    tags,
  }: IRequest): Promise<Tag[]> {
    const data = tags.map(async (tag) => {
      const tagExists = await this.tagsRepository.findTagByName(tag);

      if (!tagExists) {
        const createTag = await this.tagsRepository.create(tag);
        return createTag;
      }

      return tagExists;
    });

    const createdTags = Promise.all(data);

    return createdTags;
  }
}
