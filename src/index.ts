import express, { Express, Request, Response} from 'express';
import bodyParser from 'body-parser';

import serverConfig from './config/server.config';
import serverAdapter from './config/bullboard.config';

import apiRouter from './routes';

import SampleWorker from './workers/sample.worker';
import SubmissionWorker from './workers/submission.worker';
import { SAMPLE_QUEUE, SUBMISSION_QUEUE } from './utils/constants';
// import SubmissionQueueProducer from './producers/submissionQueue.producer';

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
    console.log(`For the Queues UI, open http://localhost:${serverConfig.PORT}/admin/queues`);

    SampleWorker(SAMPLE_QUEUE);
    SubmissionWorker(SUBMISSION_QUEUE);

//     const code1 = `x = input();
// print("hello from Python");
// print("X is :", x);
// `;
//     const inputData1 = `100
// `;
//     SubmissionQueueProducer({
//         problemId : "100",
//         userId : "1010",
//         code : code1,
//         language : "PYTHON",
//         inputData : inputData1
//     });
    
//     const code2 = `
//     import java.util.*;
//     public class Main {
//       public static void main(String[] args) {
//         Scanner scn = new Scanner(System.in);
//         int input = scn.nextInt();

//         System.out.println("Input Given By User : " + input);
//         for(int i=0;i<input;i++){
//             System.out.println(i);
//         }
//       }
//     }
//     `;
//     const inputData2 = `5`;

//     SubmissionQueueProducer({
//         problemId : "100",
//         userId : "1010",
//         code : code2,
//         language : "JAVA",
//         inputData : inputData2
//     });

//     const code3 = `#include<iostream>
// using namespace std;
// int main(){
// cout<<"Hello From CPP";
// return 0;
// }
//     `;
//     const inputData3 = `5`;

//     SubmissionQueueProducer({
//         problemId : "100",
//         userId : "1010",
//         code : code3,
//         language : "CPP",
//         inputData : inputData3
//     });

//     const code4 = `x = input();
// print("hello 2nd time from Python");
// print("X is :", x);
// `;
//     const inputData4 = `100
// `;
//     SubmissionQueueProducer({
//         problemId : "100",
//         userId : "1010",
//         code : code4,
//         language : "PYTHON",
//         inputData : inputData4
//     });

//     const code5 = `#include<iostream>
// using namespace std;
// int main(){
// cout<<"Hello 2nd Time From CPP";
// return 0;
// }
//     `;
//     const inputData5 = `5`;

//     SubmissionQueueProducer({
//         problemId : "100",
//         userId : "1010",
//         code : code5,
//         language : "CPP",
//         inputData : inputData5
//     });

});