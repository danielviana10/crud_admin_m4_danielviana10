import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { ZodError } from "zod";

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    if(err instanceof AppError){
        return res.status(err.statusCode).json({ message: err.message })
    }

    if(err instanceof ZodError) {
        const { message } = err.flatten().fieldErrors
        return res.status(400).json({ message });
    }
    
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error"});
};