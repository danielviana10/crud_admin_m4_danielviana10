import { Request, Response } from "express";
// import { User, UserRead } from "../interfaces/user.interface";
import { userServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user = await userServices.create(req.body);
    return res.status(201).json(user);
};

const listUserCourse =async (req: Request, res: Response): Promise<Response> => {
    const userCourses = await userServices.listUserCourse(req.params.id);
    return res.status(200).json(userCourses)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const users = await userServices.read();
    return res.status(200).json(users);
};

// const retrieve = async (req: Request, res: Response): Promise<Response> => {
//     const user: User = res.locals.foundUser
//     return res.status(200).json();
// };

// const partialUpdate = async (req: Request, res: Response): Promise<Response> => {
//     const { userId } = req.params;
//     // const { validated } = res.locals;
//     const user: User = await userServices.partialUpdate(userId, req.body);
//     return res.status(200).json();
// };

// const destroy = async (req: Request, res: Response): Promise<Response> => {
//     await userServices.destroy(req.params.userId)
//     return res.status(204).json();
// };

export default { create, listUserCourse, read };