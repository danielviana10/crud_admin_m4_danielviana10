import { Request, Response } from "express";
import { userServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user = await userServices.create(req.body);
    return res.status(201).json(user);
};

const listUserCourse =async (req: Request, res: Response): Promise<Response> => {
    const userCourses = await userServices.listUserCourse(req.params.id);
    return res.status(200).json(userCourses)
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const users = await userServices.read();
    return res.status(200).json(users);
};

export default { create, listUserCourse, read };