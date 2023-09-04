import { Router } from "express";
import { courseController } from "../controllers";
import { validatedBody } from "../middlewares/validateBody.middleware";
import { createCourseSchema } from "../schema/course.schema";
import middlewares from "../middlewares";

const courseRouter: Router = Router();

courseRouter.get("", courseController.read)

courseRouter.post("", middlewares.ensureTokenIsValid, middlewares.ensureTokenAdmin, validatedBody(createCourseSchema), courseController.create);

courseRouter.use("/:courseId/users/:userId", middlewares.ensureTokenIsValid, middlewares.ensureTokenAdmin, middlewares.validateIdExists('params', 'courseId', 'courses', "User/course not found"), middlewares.validateIdExists('params', 'userId', 'users', "User/course not found"))

courseRouter.post("/:courseId/users/:userId", courseController.addUserToCourse)
courseRouter.delete("/:courseId/users/:userId", courseController.setUserNullFromCourse)

courseRouter.use("/:courseId/users", middlewares.ensureTokenIsValid, middlewares.ensureTokenAdmin, middlewares.validateIdExists('params', 'courseId', 'courses', "User/course not found"))

courseRouter.get("/:courseId/users", courseController.listCourseUser)

export default courseRouter;