import { EmailAlreadyUseError } from '@/domain/errors';
import { AccessToken } from '../models/access-token';

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
