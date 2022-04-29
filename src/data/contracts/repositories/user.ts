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

export interface CreateUserRepository {
  createUser: (
    params: CreateUserRepository.Params,
  ) => Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = { id: string };
}
