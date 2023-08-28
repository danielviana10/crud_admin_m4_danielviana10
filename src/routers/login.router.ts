import { Router } from "express";
import { session } from "../controllers";
import { validatedBody } from "../middlewares/validateBody.middleware";
import { sessionSchema } from "../schema/session.schema";

const loginRouter: Router = Router();

loginRouter.post("", validatedBody(sessionSchema), session)

export default loginRouter;