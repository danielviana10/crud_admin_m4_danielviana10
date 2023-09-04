import { handleError } from "./handleError.middleware";
import { validateEmailExists } from "./validateEmailExists.middleware";
import { validateIdExists } from "./validateIdExists.middleware";
import { validatedBody } from "./validateBody.middleware";
import { ensureTokenIsValid } from "./ensureTokenIsValid.middleware";
import { ensureTokenAdmin } from "./ensureTokenAdmin.middleware";
import { validateCourseExists } from "./validateCourseExists.middleware";

export default { ensureTokenIsValid, ensureTokenAdmin, handleError, validateEmailExists, validateIdExists, validatedBody, validateCourseExists };