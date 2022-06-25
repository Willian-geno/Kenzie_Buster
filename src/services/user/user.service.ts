import { Request } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../../entities/User";
import { userRepository } from "../../repositories";
import * as dotenv from "dotenv";
import { AssertsShape } from "yup/lib/object";
import { hash } from "bcrypt";
import {
    getAllUsersSchema,
    serializedCreateUserSchema,
} from "../../schemas/user";

dotenv.config();

interface ILogin {
    status: number;
    message: object;
}

class userService {
    loginUser = async ({ validated }: Request): Promise<ILogin> => {
        const user: User = await userRepository.findOne({
            email: validated.email,
        });

        if (!user) {
            return {
                status: 401,
                message: { message: "Invalid credentials" },
            };
        }

        if (!(await user.comparePwd(validated.password))) {
            return {
                status: 401,
                message: { message: "Invalid credentials" },
            };
        }

        const token: string = sign({ ...user }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRES_IN,
        });

        return {
            status: 200,
            message: { token },
        };
    };

    createUser = async ({ validated }: Request): Promise<AssertsShape<any>> => {
        validated.password = await hash(validated.password, 10);

        const user: User = await userRepository.save(validated);

        return await serializedCreateUserSchema.validate(user, {
            stripUnknown: true,
        });
    };

    getUserById = async ({ user }: Request): Promise<Partial<User>> => {
        const userFind = await userRepository.findOne({ userId: user.userId });

        return serializedCreateUserSchema.validate(userFind, {
            stripUnknown: true,
        });
    };

    getAll = async (): Promise<Partial<User>[]> => {
        const users = await userRepository.all();

        return getAllUsersSchema.validate(users, {
            stripUnknown: true,
        });
    };

    updateUser = async ({ decoded, body }: Request): Promise<Partial<User>> => {
        await userRepository.update(decoded.userId, { ...body });

        return serializedCreateUserSchema.validate(
            { ...decoded, ...body },
            {
                stripUnknown: true,
            }
        );
    };

    deleteUser = async ({ user }: Request): Promise<ILogin> => {
        await userRepository.delete(user.userId);

        return {
            status: 200,
            message: { message: "User has been deleted" },
        };
    };
}

export default new userService();
