export interface CheckUserByEmailRepository {
  checkByEmail: (
    params: CheckUserByEmailRepository.Params,
  ) => Promise<CheckUserByEmailRepository.Result>;
}

export namespace CheckUserByEmailRepository {
  export type Params = {
    email: string;
  };

  export type Result = boolean;
}
