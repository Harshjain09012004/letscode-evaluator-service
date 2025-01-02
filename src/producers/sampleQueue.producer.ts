import SampleQueue from "../queues/sample.queue";

async function SampleQueueProducer(name : string, payload : Record<string, unknown>){
    await SampleQueue.add(name, payload);
    console.log(name, payload);
}

export default SampleQueueProducer;