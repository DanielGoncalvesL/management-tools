import { Tag } from '@/domain/entities';

export interface CreateToolRepository {
  create: (
    params: CreateToolRepository.Params,
  ) => Promise<CreateToolRepository.Result>;
}

export namespace CreateToolRepository {
  export type Params = {
    title: string;
    link: string;
    description: string;
    tags: Tag[];
  };

  export type Result = { id: string; createdAt: Date };
}

export interface CheckToolByTitleRepository {
  checkByTitle: (
    params: CheckToolByTitleRepository.Params,
  ) => Promise<CheckToolByTitleRepository.Result>;
}

export namespace CheckToolByTitleRepository {
  export type Params = {
    title: string;
  };

  export type Result = boolean;
}
