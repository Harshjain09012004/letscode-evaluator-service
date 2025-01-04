import express from 'express';
import pingController from '../../controller/ping.controller';
import submissionRouter from './submission.routes';

const v1Router = express.Router();
v1Router.use('/ping', pingController);
v1Router.use('/submission', submissionRouter);

export default v1Router;