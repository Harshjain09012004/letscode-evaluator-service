import express from "express";
import { addSubmission } from "../../controller/submission.controller";
import { validator } from "../../validators/submission.validator";
import { createSubmissionZodSchema } from "../../dtos/createSubmission.dto";

const submissionRouter = express.Router();

submissionRouter.post('/', validator(createSubmissionZodSchema), addSubmission);

export default submissionRouter;