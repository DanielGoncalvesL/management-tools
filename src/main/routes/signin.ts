import { Router } from 'express';
import { makeSignInUserController } from '@/main/factories/application/controllers';
import { adaptExpressRoute as adapt } from '@/main/adapters';

export default (router: Router): void => {
  const signInController = makeSignInUserController();

  router.post('/signin', adapt(signInController));
};
