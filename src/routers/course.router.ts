import { Router } from "express";
import { courseController } from "../controllers";
import { validatedBody } from "../middlewares/validateBody.middleware";
import { createCourseSchema } from "../schema/course.schema";
import middlewares from "../middlewares";

const courseRouter: Router = Router();

courseRouter.post("", validatedBody(createCourseSchema), courseController.create);

courseRouter.post("/:courseId/users/:userId", middlewares.ensureTokenIsValid, middlewares.ensureTokenOwner, courseController.addUserToCourse)
courseRouter.delete("/:courseId/users/:userId", middlewares.ensureTokenIsValid, courseController.setUserNullFromCourse)
// courseRouter.get("", courseController.read);
// courseRouter.get("/:id/courses", courseController.retrieve)

export default courseRouter;