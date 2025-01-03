import express, { Express, Request, Response} from 'express';
import serverConfig from './config/server.config';
import apiRouter from './routes';
import SampleQueueProducer from './producers/sampleQueue.producer';
import SampleWorker from './workers/sample.worker';
import serverAdapter from './config/bullboard.config';
const app: Express = express();

app.get('/', (_:Request, res:Response)=>{
    res.json({
        message : "Server is working fine!"
    });
});

app.use('/api', apiRouter);

app.use('/admin/queues', serverAdapter.getRouter());

app.listen(serverConfig.PORT, ()=>{
    console.log(`Seriver is Working on Port ${serverConfig.PORT}`);
    console.log('For the Queues UI, open http://localhost:3000/admin/queues');
    
    SampleWorker('SampleQueue');
    SampleQueueProducer('SampleJob', {
        name : "Harsh",
        company: "Microsoft",
        position: "Intern",
        location: "Remote | BLR"
    }, {priority : 2});

    SampleQueueProducer('SampleJob', {
        name : "Karl",
        company: "Linkedin",
        position: "Intern",
        location: "Remote | PUNE"
    }, {priority : 1});
});