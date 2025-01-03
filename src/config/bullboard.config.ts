import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import SampleQueue from "../queues/sample.queue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
    queues : [new BullMQAdapter(SampleQueue)],
    serverAdapter: serverAdapter,
});

export default serverAdapter;