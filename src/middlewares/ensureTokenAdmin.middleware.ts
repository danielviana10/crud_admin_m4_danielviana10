import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

export const ensureTokenAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {decoded} = res.locals;

    if(decoded.admin)
        return next()

    else{
        throw new AppError("Insufficient permission", 403);
    }
}