import { Request, Response } from "express";
import { login } from "../services";

const session = async (req: Request, res: Response): Promise<Response> => {
    const token = await login(req.body);

    return res.status(200).json({ token });

}

export default session;