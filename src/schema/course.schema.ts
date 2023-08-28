import { z } from "zod";

const courseSchema = z.object({
    id: z.number(),
    name: z.string().max(15),
    description: z.string(),
})

const createCourseSchema = courseSchema.omit({
    id:true,
})

export { courseSchema, createCourseSchema }