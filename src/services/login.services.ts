import { compare } from "bcryptjs";
import { AppError } from "../errors/errors";
import { LoginRequest } from "../interfaces/login.interface";
import { UserResult } from "../interfaces/user.interface";
import { sign } from "jsonwebtoken";
import { client } from "../database";

const login = async (payload: LoginRequest): Promise<string> => {
    const queryString: string = `
        SELECT * FROM "users" WHERE email = $1;
    `
    
    const queryResult: UserResult = await client.query(queryString, [payload.email]);

    if(!queryResult.rowCount){
        throw new AppError("Wrong email/password", 401);
    };

    const matchPassword: boolean = await compare(payload.password, queryResult.rows[0].password);

    if(!matchPassword){
        throw new AppError("Wrong email/password", 401);
    };

    const token: string = sign(
        { email: queryResult.rows[0].email, admin:queryResult.rows[0].admin },
        process.env.SECRET_KEY!,
        { 
            expiresIn: process.env.EXPIRES_IN,
            subject: queryResult.rows[0].id.toString(),
        }
    );

    return token
};

export default login;