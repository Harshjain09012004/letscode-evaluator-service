import { Queue } from "bullmq";
import redisConnection from "../config/redis.config";

const SampleQueue = new Queue('SampleQueue', {connection: redisConnection});

export default SampleQueue;