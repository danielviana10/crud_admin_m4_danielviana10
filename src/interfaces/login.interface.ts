import { z } from "zod";
import { sessionSchema } from "../schema/session.schema";

export type LoginRequest = z.infer<typeof sessionSchema>;