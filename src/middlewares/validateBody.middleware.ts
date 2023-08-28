import { NextFunction, Request, Response } from "express"
import { ZodError, ZodTypeAny } from "zod"

export const validatedBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {
        const validateData = schema.parse(req.body);

        req.body = validateData;
    
        return next()
};