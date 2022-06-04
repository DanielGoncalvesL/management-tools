import { EmailAlreadyUseError } from '@/domain/entities/errors';
import { AccessToken } from '../entities/access-token';

export interface SignUpUser {
  perform: (params: SignUpUser.Params) => Promise<SignUpUser.Result>;
}

export namespace SignUpUser {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = AccessToken | EmailAlreadyUseError;
}
