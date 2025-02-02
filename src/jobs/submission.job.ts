import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition";
import createExecutor from "../utils/executorFactory";
import DockerStreamOutput from "../types/dockerStreamOutput";
import { SubmissionPayload } from "../types/submissionPayload";
import EvaluationQueueProducer from "../producers/evaluationQueue.producer";
import determineStatus from "../utils/errorStatus";

class SubmissionJob implements IJob{
    name : string;
    payload: SubmissionPayload;
    
    constructor(payload : SubmissionPayload){
        this.name = this.constructor.name;
        this.payload = payload;
    }

    async handle(job?: Job) : Promise<void>{
        console.log("Submission Job Handler Kicking");
        if(job){
            console.log("Payload is :", this.payload);
            console.log("Language is ", this.payload.language);

            const codeLanguage = this.payload.language;
            const inputData = this.payload.inputData;
            const outputData = this.payload.outputData;

            const executorStrategy = createExecutor(codeLanguage);

            if(executorStrategy!=null){
                const codeResponse : DockerStreamOutput = await executorStrategy.execute(this.payload.code, inputData, outputData);

                if(codeResponse.stderr){
                    console.log("Some Error Occured During Execution");
                    console.log(codeResponse.stderr);
                    EvaluationQueueProducer({
                        userId : this.payload.userId,
                        submissionId : this.payload.submissionId,
                        error : codeResponse.stderr,
                        data : {},
                        status : determineStatus(codeResponse.stderr)
                    });
                }
                else{
                    console.log("Code Executed Successfully !");
                    console.log(codeResponse.stdout);
                    EvaluationQueueProducer({
                        userId : this.payload.userId,
                        submissionId : this.payload.submissionId,
                        error : {},
                        data : '',
                        status : (codeResponse.stdout.trim() === this.payload.outputData.trim() ? "Accepted" : "WA")
                    });
                }
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