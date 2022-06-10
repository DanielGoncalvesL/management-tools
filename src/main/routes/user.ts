import { Router } from 'express';
import {
  makeSignInUserController,
  makeSignUpUserController,
} from '@/main/factories/application/controllers';
import { adaptExpressRoute as adapt } from '@/main/adapters';

const signInController = makeSignInUserController();

const signUpController = makeSignUpUserController();

export default (router: Router): void => {
  router.post('/signin', adapt(signInController));

  router.post('/signup', adapt(signUpController));
};
