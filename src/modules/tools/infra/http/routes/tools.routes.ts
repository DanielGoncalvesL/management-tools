import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ToolsController from '@modules/tools/infra/http/controllers/ToolsController';

const toolsRouter = Router();
const toolsController = new ToolsController();

toolsRouter.use(ensureAuthenticated);

toolsRouter.post('/', celebrate({
  [Segments.BODY]: {
    title: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().required(),
  },
}), toolsController.create);

toolsRouter.get('/', toolsController.show);

toolsRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
}), toolsController.delete);

export default toolsRouter;
