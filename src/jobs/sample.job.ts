import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition";

class SampleJob implements IJob{
    name : string;
    payload: Record<string, unknown>;
    
    constructor(payload : Record<string, unknown>){
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle(job?: Job):void{
        console.log("Job Handler");
        console.log(this.payload);
        if(job){
            console.log(job.name, job.id, job.data);
        }
    }

    failed(job?: Job):void{
        console.log("Job Failed");
        if(job){
            console.log(job.id);
        }
    }

}

export default SampleJob;