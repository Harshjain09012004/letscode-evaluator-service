/* eslint-disable no-unused-vars */
import { Job } from "bullmq";

export interface IJob {
    name : string;
    payload? : Record<string, unknown>;
    handle : (job? : Job) => Promise<void>;
    failed : (job? : Job) => void;
}