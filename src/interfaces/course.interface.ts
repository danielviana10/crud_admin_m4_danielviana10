import { QueryResult } from "pg";
import { z } from "zod";
import { courseSchema, createCourseSchema } from "../schema/course.schema";

type Course = z.infer<typeof courseSchema>
type CourseRequest = z.infer<typeof createCourseSchema>;
type CourseResult = QueryResult<Course>;

export { Course, CourseRequest, CourseResult };