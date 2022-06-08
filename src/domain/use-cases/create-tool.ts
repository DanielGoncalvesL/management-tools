import { ToolAlreadyUseError } from '@/domain/entities/errors';
import { Tag } from '@/domain/entities';
import {
  CheckToolByTitleRepository,
  CreateToolRepository,
} from '@/domain/contracts/repositories';

type Setup = (
  toolRepository: CreateToolRepository & CheckToolByTitleRepository,
) => CreateTool;

export type CreateTool = (params: {
  title: string;
  link: string;
  description: string;
  tags: Tag[];
}) => Promise<{ id: string; createdAt: Date }>;

export const setupCreateTool: Setup =
  toolRepository =>
  async ({ description, link, tags, title }) => {
    const toolExists = await toolRepository.checkByTitle({ title });

    if (toolExists) {
      throw new ToolAlreadyUseError();
    }

    const { id, createdAt } = await toolRepository.create({
      description,
      link,
      tags,
      title,
    });

    return {
      id,
      createdAt,
    };
  };
