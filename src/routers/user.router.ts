import { Router } from "express";
import { userController } from "../controllers";
import middlewares from "../middlewares";
import { createUserSchema } from "../schema/user.schemas";

const userRouter: Router = Router();

userRouter.post("", middlewares.validatedBody(createUserSchema), middlewares.validateEmailExists, userController.create);

userRouter.get("", middlewares.ensureTokenIsValid, middlewares.ensureTokenAdmin, userController.read)

userRouter.get("/:id/courses", middlewares.ensureTokenIsValid, middlewares.ensureTokenAdmin, userController.listUserCourse)


export default userRouter;