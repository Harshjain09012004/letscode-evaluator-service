import express, { Express, Request, Response} from 'express';
import serverConfig from './config/server.config';
import apiRouter from './routes';
const app: Express = express();

app.get('/', (_:Request, res:Response)=>{
    res.json({
        message : "Server is working fine!"
    });
});

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, ()=>{
    const res : string = "You are getting watched in server!";
    console.log(`Seriver is Working on Port ${serverConfig.PORT}`);
    console.log(res);
});