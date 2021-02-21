import 'reflect-metadata'
import {Router} from 'express';

import AppointmentsController from '@modules/appointments/infra/controllers/AppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();    

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/',appointmentsController.create);

export default appointmentsRouter;