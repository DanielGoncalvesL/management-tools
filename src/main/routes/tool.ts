import { Router } from 'express';
import { makeCreateToolController } from '@/main/factories/application/controllers';
import { adaptExpressRoute as adapt } from '@/main/adapters';

const createToolController = makeCreateToolController();

export default (router: Router): void => {
  router.post('/tool', adapt(createToolController));
};
