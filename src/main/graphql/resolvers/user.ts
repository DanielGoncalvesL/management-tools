import { adaptResolver } from '@/main/adapters';
import {
  makeSignInUserController,
  makeSignUpUserController,
} from '@/main/factories/application/controllers';

export const user = {
  Query: {
    signIn: async (parent: any, args: any) =>
      adaptResolver(makeSignInUserController(), args),
  },

  Mutation: {
    signUp: async (parent: any, args: any) =>
      adaptResolver(makeSignUpUserController(), args),
  },
};
