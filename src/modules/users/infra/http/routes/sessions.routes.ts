import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import {container} from 'tsyringe';

const sessionsRouter = Router();


const sessionsController = new SessionsController();

sessionsRouter.post('/',sessionsController.create);

export default sessionsRouter;