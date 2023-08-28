import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces/user.interface";
import { client } from "../database";
import { AppError } from "../errors/errors";

export const ensureTokenAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {decoded} = res.locals
    console.log(decoded)
    if(decoded){
        const query: UserResult = await client.query(
            'SELECT * FROM "users" WHERE "id" = $1',[decoded.sub]
        );

        if(query.rows[0].admin == false){
            throw new AppError("Insufficient permission", 403);
        }
    }

    return next();
}