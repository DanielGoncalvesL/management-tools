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

export interface LoadByEmailRepository {
  loadByEmail: (
    params: LoadByEmailRepository.Params,
  ) => Promise<LoadByEmailRepository.Result>;
}

export namespace LoadByEmailRepository {
  export type Params = {
    email: string;
  };

  export type Result = { id: string; password: string } | undefined;
}

export interface CheckUserById {
  checkById(params: CheckUserById.Params): Promise<CheckUserById.Result>;
}

export namespace CheckUserById {
  export type Params = { id: string };

  export type Result = boolean;
}
