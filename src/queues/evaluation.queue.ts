import { Queue } from "bullmq";
import redisConnection from "../config/redis.config";

const EvaluationQueue = new Queue('EvaluationQueue', {connection: redisConnection});

export default EvaluationQueue;