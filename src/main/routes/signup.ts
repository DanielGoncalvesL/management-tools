import { Router } from 'express';
import { makeSignUpUserController } from '@/main/factories/application/controllers';
import { adaptExpressRoute as adapt } from '@/main/adapters';

export default (router: Router): void => {
  const signUpController = makeSignUpUserController();

  router.post('/signup', adapt(signUpController));
};
