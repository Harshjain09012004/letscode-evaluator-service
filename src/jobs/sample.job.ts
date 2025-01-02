import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition";

class SampleJob implements IJob{
    name : string;
    payload: Record<string, unknown>;
    
    constructor(payload : Record<string, unknown>){
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle():void{
        console.log("Job Handler");
    }

    failed(job?: Job):void{
        console.log("Job Failed");
        if(job){
            console.log(job.id);
        }
    }

}

export default SampleJob;