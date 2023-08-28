import { Request, Response } from "express";
import { courseServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const course = await courseServices.create(req.body)
    return res.status(201).json(course);
};

const addUserToCourse = async (req: Request, res: Response): Promise<Response> => {
    const {userId, courseId} = req.params;

    await courseServices.addUserToCourse(userId, courseId)

    return res.status(201).json({ message: "User successfully vinculed to course." });
};

const setUserNullFromCourse = async (req: Request, res: Response): Promise<Response> => {
    const {userId, courseId} = req.params;
    await courseServices.setUserNullFromCourse(userId, courseId)
    return res.status(204).json();
};

// const read = async (req: Request, res: Response): Promise<Response> => {
//     const course: CourseRead = await courseServices.read();
//     return res.status(200).json(course);
// };

// const retrieve = async (req: Request, res: Response): Promise<Response> => {
//     const course: Course = res.locals.foundUser
//     return res.status(200).json();
// };

// const partialUpdate = async (req: Request, res: Response): Promise<Response> => {
//     const { courseId } = req.params;
//     // const { validated } = res.locals;
//     const course: Course = await courseServices.partialUpdate(courseId, req.body);
//     return res.status(200).json();
// };



export default { create, addUserToCourse, setUserNullFromCourse };