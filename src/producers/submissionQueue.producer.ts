import SubmissionQueue from "../queues/submission.queue";

async function SubmissionQueueProducer(payload : Record<string, unknown>){
    await SubmissionQueue.add('SubmissionJob', payload);
    console.log("Producer Added the Submission Job in queue", payload);
}

export default SubmissionQueueProducer;