import EvaluationQueue from "../queues/evaluation.queue";

async function EvaluationQueueProducer(payload : Record<string, unknown>){
    await EvaluationQueue.add('EvaluationJob', payload);
    console.log("Producer Added the Evaluation Job in queue", payload);
}

export default EvaluationQueueProducer;