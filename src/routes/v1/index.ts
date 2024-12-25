import express from 'express';
import pingController from '../../controller/ping.controller';

const v1Router = express.Router();
v1Router.use('/ping', pingController);

export default v1Router;