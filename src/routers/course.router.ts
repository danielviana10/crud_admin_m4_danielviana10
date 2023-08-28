import { Router } from "express";
import { courseController } from "../controllers";
import { validatedBody } from "../middlewares/validateBody.middleware";
import { createCourseSchema } from "../schema/course.schema";
import middlewares from "../middlewares";

const courseRouter: Router = Router();


courseRouter.post("", middlewares.ensureTokenAdmin, validatedBody(createCourseSchema), courseController.create);

courseRouter.post("/:courseId/users/:userId", middlewares.ensureTokenIsValid,middlewares.validateIdExists('params', 'userId', 'users', "User/course not found"), courseController.addUserToCourse)
courseRouter.delete("/:courseId/users/:userId", middlewares.ensureTokenIsValid, middlewares.validateIdExists('params', 'courseId', 'courses', "User/course not found"), courseController.setUserNullFromCourse)

export default courseRouter;