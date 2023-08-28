import format from "pg-format";
import { UserRequest, UserResult, UserReturn } from "../interfaces/user.interface";
import { client } from "../database";
import { hash } from "bcryptjs";
import { userWhithoutPassowrd } from "../schema/user.schemas";
import { AppError } from "../errors/errors";


const create = async (payload: UserRequest): Promise<UserReturn> => {
    payload.password = await hash(payload.password, 10);
    const queryFormat: string = format(
        'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )
    
    const query: UserResult = await client.query(queryFormat);
    return userWhithoutPassowrd.parse(query.rows[0]);
}

const listUserCourse = async (userId: string) => {
    const queryString: string = `
        SELECT 
            c.id "courseId",
            c."name" "courseName",
            c.description "courseDescription",
            uc.active "userActiveInCourse",
            u.id "userId",
            u."name" "userName"
        FROM users u 
        JOIN "userCourses" uc 
            ON u.id = uc."userId" 
        JOIN courses c 
            ON c.id = uc."courseId" 
        WHERE u.id = $1;
    `;

    const queryResult = await client.query(queryString, [userId]);

    if(!queryResult.rowCount){
        throw new AppError("No course found", 404)
    }

    return queryResult.rows;
}

const read = async () => {
    const query = await client.query(
        'SELECT * FROM "users";'
    );
    return query.rows;
};

// const partialUpdate = async (
//     userId: string,
//     payload: UserUpdate
// ): Promise<User> => {
//     const queryFormat: string = format(
//         'UPDATE "users" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
//         Object.keys(payload),
//         Object.values(payload)
//     );
//     const query: UserResult = await client.query(queryFormat, [userId]);
//     return query.rows[0];
// };

// const destroy = async (userId: string): Promise<void> => {
//     await client.query('DELETE FROM "users" WHERE "id" = $1', [userId]);
// }

export default { create, listUserCourse, read }