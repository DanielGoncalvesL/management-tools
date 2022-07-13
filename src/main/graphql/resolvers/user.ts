import { adaptResolver } from '@/main/adapters';
import { makeSignUpUserController } from '@/main/factories/application/controllers';

export const user = {
  Query: {
    signUp: async (parent: any, args: any) =>
      adaptResolver(makeSignUpUserController(), args),
  },
};
