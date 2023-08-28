import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { UserResult } from "../interfaces/user.interface";
import { client } from "../database";

export const ensureTokenOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {decoded} = res.locals

    if(decoded.sub){
        const query: UserResult = await client.query(
            'SELECT * FROM "users" WHERE "id" = $1',[decoded.sub]
        );

        if(query.rows[0].id === decoded.sub){
            console.log(decoded.sub)
            console.log(query.rows[0].id)
            throw new AppError("Only the account owner can do this", 403);
        }
    }
    return next();
}