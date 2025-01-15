import express, { Express, Request, Response} from 'express';
import bodyParser from 'body-parser';

import serverConfig from './config/server.config';
import serverAdapter from './config/bullboard.config';

import apiRouter from './routes';
import SampleWorker from './workers/sample.worker';
import runPython from './containers/runPythonDocker';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}));

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
    
    const code = `x = input();
y = input();
print("value of x is :", x);
print('value of y is :', y);
print('Hello');`;

    const inputData = `133
2023`;

    runPython(code, inputData);

    SampleWorker('SampleQueue');
});