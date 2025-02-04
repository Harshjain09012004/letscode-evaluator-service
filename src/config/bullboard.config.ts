import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import SampleQueue from "../queues/sample.queue";
import SubmissionQueue from "../queues/submission.queue";
import EvaluationQueue from "../queues/evaluation.queue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
    queues : [new BullMQAdapter(SampleQueue), new BullMQAdapter(SubmissionQueue), new BullMQAdapter(EvaluationQueue)],
    serverAdapter: serverAdapter,
});

export default serverAdapter;