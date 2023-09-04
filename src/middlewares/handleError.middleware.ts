import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }

    if(err instanceof ZodError) {
        const zodMessage = err.flatten().fieldErrors
        return res.status(400).json( zodMessage );
    }

    if(err instanceof JsonWebTokenError) {
        return res.status(401).json({ message: err.message } )
    }
    
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error"});
};