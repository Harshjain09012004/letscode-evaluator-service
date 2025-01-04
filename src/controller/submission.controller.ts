import { Request, Response } from 'express';
import { CreateSubmissionDto } from '../dtos/createSubmission.dto';

export function addSubmission(req: Request, res: Response){
    try{
        const sumbimissionDto = req.body as CreateSubmissionDto;

        res.status(201).json({
            success : true,
            error : {},
            message : "Successfully collected the submission",
            data : sumbimissionDto
        });
    }

    catch(err){
        res.status(400).json({
            success : false,
            error : err,
            message : "Some Error Occured",
            data : {}
        });
    }
}