import SampleQueue from "../queues/sample.queue";

async function SampleQueueProducer(name : string, payload : Record<string, unknown>, priority : Record<string, number>){
    await SampleQueue.add(name, payload, priority);
    console.log("Producer Added the Job in queue", payload);
}

export default SampleQueueProducer;