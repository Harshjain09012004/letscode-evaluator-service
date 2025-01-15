import express, { Express, Request, Response} from 'express';
import bodyParser from 'body-parser';

import serverConfig from './config/server.config';
import serverAdapter from './config/bullboard.config';

import apiRouter from './routes';
import SampleWorker from './workers/sample.worker';
import runJava from './containers/runJavaDocker';

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
    
    const code = `
    import java.util.*;
    public class Main {
      public static void main(String[] args) {
        Scanner scn = new Scanner(System.in);
        int input = scn.nextInt();

        System.out.println("Input Given By User : " + input);
        for(int i=0;i<input;i++){
            System.out.println(i);
        }
      }
    }
    `;

    const inputData = `5`;

    runJava(code, inputData);

    SampleWorker('SampleQueue');
});