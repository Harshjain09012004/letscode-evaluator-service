import { Job, Worker } from "bullmq";
import SampleJob from "../jobs/sample.job";
import redisConnection from "../config/redis.config";

function SampleWorker(queueName : string){
   new Worker(
        queueName,
        async (job: Job)=>{
            if(job.name === 'SampleJob'){
                console.log('Sample Job Worker Kicking', job);
                
                const sampleJobInstance = new SampleJob(job.data);

                sampleJobInstance.handle(job);
                
                return true;
            }
        },
        {connection : redisConnection}
    );
}

export default SampleWorker;