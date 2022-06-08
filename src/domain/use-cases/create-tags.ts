import { Tag } from '@/domain/entities';
import { CreateTagRepository } from '@/domain/contracts/repositories';

type Setup = (tagRepository: CreateTagRepository) => CreateTags;

export type CreateTags = (params: {
  tagsName: string[];
}) => Promise<{ tags: Tag[] }>;

export const setupCreateTags: Setup =
  tagRepository =>
  async ({ tagsName }) => {
    const createdTags = await tagRepository.create({ names: tagsName });

    return { tags: createdTags };
  };
