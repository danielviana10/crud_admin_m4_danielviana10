import { QueryResult } from "pg";
import { z } from "zod";
import { createUserSchema, userSchema, userWhithoutPassword } from "../schema/user.schemas";

type User = z.infer<typeof userSchema>
type UserRequest = z.infer<typeof createUserSchema>;
type UserReturn = z.infer<typeof userWhithoutPassword>;
type UserResult = QueryResult<User>;

export { User, UserRequest, UserReturn, UserResult };