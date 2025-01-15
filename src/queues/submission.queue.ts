import { Queue } from "bullmq";
import redisConnection from "../config/redis.config";

const SubmissionQueue = new Queue('SubmissionQueue', {connection: redisConnection});

export default SubmissionQueue;