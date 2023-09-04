import { Router } from "express";
import { userController } from "../controllers";
import middlewares from "../middlewares";
import { createUserSchema } from "../schema/user.schemas";

const userRouter: Router = Router();

userRouter.post("", middlewares.validatedBody(createUserSchema), middlewares.validateEmailExists, userController.create);

userRouter.use("", middlewares.ensureTokenIsValid, middlewares.ensureTokenAdmin)

userRouter.get("", userController.read)

userRouter.get("/:id/courses", middlewares.ensureTokenIsValid, middlewares.ensureTokenAdmin, middlewares.validateIdExists("params","id","users","User not found."), userController.listUserCourse)


export default userRouter;