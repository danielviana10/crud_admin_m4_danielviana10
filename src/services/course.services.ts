import format from "pg-format";
import { client } from "../database";
import { Course, CourseRequest, CourseResult } from "../interfaces/course.interface";


const create = async (payload: CourseRequest): Promise<Course> => {
    const queryFormat: string = format(
        'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )
    
    const query: CourseResult = await client.query(queryFormat);
    return query.rows[0];
}

const addUserToCourse = async (userId: string, courseId: string) : Promise<void> => {
    const queryString: string = `
        INSERT INTO "userCourses" ("userId","courseId")
        VALUES ($1, $2)
        RETURNING *;
    `;

    await client.query(queryString, [userId, courseId]);
};

const setUserNullFromCourse = async (userId: string, courseId: string): Promise<void> => {
    const queryString: string = `
        UPDATE "userCourses" SET "active" = false
        WHERE "userId" = $1 AND "courseId" = $2;
    `;

    await client.query(queryString, [userId, courseId]);
}

// const read = async (): Promise<CourseRead> => {
//     const query: CourseResult = await client.query(
//         'SELECT * FROM "courses";'
//     );
//     return query.rows;
// };

// const partialUpdate = async (
//     courseId: string,
//     payload: CourseUpdate
// ): Promise<Course> => {
//     const queryFormat: string = format(
//         'UPDATE "courses" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
//         Object.keys(payload),
//         Object.values(payload)
//     );
//     const query: CourseResult = await client.query(queryFormat, [courseId]);
//     return query.rows[0];
// };

// const destroy = async (courseId: string): Promise<void> => {
//     await client.query('DELETE FROM "courses" WHERE "id" = $1', [courseId]);
// }

export default { create, addUserToCourse, setUserNullFromCourse };