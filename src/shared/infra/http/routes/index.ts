import { Router } from 'express';
import classRouter from '@modules/users/infra/http/routes/class.routes';

const routes = Router();

routes.use('/class', classRouter);

export default routes;
