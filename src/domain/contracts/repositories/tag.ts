import { Tag } from '@/domain/entities';

export interface CreateTagRepository {
  create: (
    params: CreateTagRepository.Params,
  ) => Promise<CreateTagRepository.Result>;
}

export namespace CreateTagRepository {
  export type Params = { names: string[] };

  export type Result = Tag[];
}
