import express, { Express, Request, Response} from 'express';
import serverConfig from './config/server.config';
import apiRouter from './routes';
import SampleQueueProducer from './producers/sampleQueue.producer';
import SampleWorker from './workers/sample.worker';
const app: Express = express();

app.get('/', (_:Request, res:Response)=>{
    res.json({
        message : "Server is working fine!"
    });
});

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, ()=>{
    console.log(`Seriver is Working on Port ${serverConfig.PORT}`);
    
    SampleWorker('SampleQueue');
    SampleQueueProducer('SampleJob', {
        name : "Harsh",
        company: "Microsoft",
        position: "Intern",
        location: "Remote | BLR"
    });
});