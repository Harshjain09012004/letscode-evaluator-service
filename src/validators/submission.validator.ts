import { Request, Response, NextFunction} from "express";
import { ZodSchema } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validator = (schema: ZodSchema<any>) => (req:Request, res:Response, next:NextFunction) => {
    try{
        schema.parse(req.body);
        next();
    }

    catch(err){
        res.status(400).json({
            success : false,
            error : err,
            message : "Bad Request",
            data : {}
        });
    }
};