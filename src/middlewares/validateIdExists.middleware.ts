import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces/user.interface";
import { AppError } from "../errors/errors";
import { client } from "../database";

export const validateIdExists = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;

    const query: UserResult = await client.query(
        'SELECT * FROM "users" WHERE "id" = $1', [userId]
    );
    if(query.rowCount === 0){
        throw new AppError("User not found", 404);
    }

    res.locals = { ...res.locals, foundUser: query.rows[0]}
    return next();
};