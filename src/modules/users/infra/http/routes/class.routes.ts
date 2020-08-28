import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ClassController from '../controllers/ClassController';

const classRouter = Router();
const classController = new ClassController();

classRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().max(14).min(14).required(),
      investments: Joi.string().required(),
      patrimony: Joi.number().required(),
    },
  }),
  classController.create,
);

classRouter.get(
  '/all',
  celebrate({
    [Segments.BODY]: {
      secret: Joi.string().required(),
    },
  }),
  classController.index,
);

classRouter.patch('/unsubscribe/:id', classController.unsubscribe);

export default classRouter;
