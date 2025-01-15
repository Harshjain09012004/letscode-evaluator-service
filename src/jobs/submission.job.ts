import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition";
import runJava from "../containers/runJavaDocker";
import runCpp from "../containers/runCppDocker";
import runPython from "../containers/runPythonDocker";

class SubmissionJob implements IJob{
    name : string;
    payload: Record<string, string>;
    
    constructor(payload : Record<string, string>){
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle(job?: Job):void{
        console.log("Submission Job Handler Kicking");
        if(job){
            // const key = Object.keys(this.payload)[0];
            console.log("Payload is :", this.payload);
            console.log("Language is ", this.payload.language);

            if(this.payload.language == 'CPP'){
                runCpp(this.payload.code, this.payload.inputData);
            } 
            else if(this.payload.language == 'PYTHON'){
                runPython(this.payload.code, this.payload.inputData);
            } 
            else if(this.payload.language == 'JAVA'){
                runJava(this.payload.code, this.payload.inputData);
            } 
        }
    }

    failed(job?: Job):void{
        console.log("Submission Job Failed");
        if(job){
            console.log(job.id);
        }
    }

}

export default SubmissionJob;