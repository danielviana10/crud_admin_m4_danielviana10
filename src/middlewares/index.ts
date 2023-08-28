import { handleError } from "./handleError.middleware";
import { validateEmailExists } from "./validateEmailExists.middleware";
import { validateIdExists } from "./validateIdExists.middleware";
import { validatedBody } from "./validateBody.middleware";
import { ensureTokenIsValid } from "./ensureTokenIsValid.middleware";
import { ensureTokenOwner } from "./ensureTokenOwner.middleware";
import { ensureTokenAdmin } from "./ensureTokenAdmin.middleware";

export default { ensureTokenIsValid, ensureTokenOwner, ensureTokenAdmin, handleError, validateEmailExists, validateIdExists, validatedBody };