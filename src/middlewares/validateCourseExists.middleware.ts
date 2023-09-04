import { NextFunction, Request, Response } from "express";
import { CourseResult } from "../interfaces/course.interface";
import { client } from "../database";
import { AppError } from "../errors/errors";

export const validateCourseExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const courseId = req.params

    const queryFormat: string = (
        'SELECT * FROM "courses" WHERE "id" = $1'
    );

    const query: CourseResult = await client.query(queryFormat, [courseId]
    );

    if(query.rowCount === 0){
        throw new AppError("User/course not found", 404);
    };

    return next();
}