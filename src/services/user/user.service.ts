import { Request } from 'express';
import { JwtPayload, sign, verify, VerifyErrors } from 'jsonwebtoken';
import { User } from '../../entities/User';
import {  userRepository } from '../../repositories';
import * as dotenv from 'dotenv';
import Jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import {
	getAllUsersSchema,
	serializedCreateUserSchema,
} from '../../schemas/user';
import { ErrorHandler } from '../../errors';

dotenv.config();

interface ILogin {
	status: number;
	message: object;
}

class userService {
	loginUser = async ({ validated }: Request): Promise<ILogin> => {
		const user: User = await userRepository.findOne({
			email: (validated as User).email,
		});

		if (!user) {
			return {
				status: 401,
				message: { message: 'Invalid credentials' },
			};
		}

		if (!(await user.comparePwd((validated as User).password))) {
			return {
				status: 401,
				message: { message: 'Invalid credentials' },
			};
		}

		const token: string = sign({ ...user }, "1101", {
			expiresIn: "1h",
		});

		return {
			status: 200,
			message: { token },
		};
	};

	createUser = async ({ validated, headers }: Request) => {

		if (headers.authorization.split(' ')[1]) {
			verify(
				headers.authorization.split(' ')[1],
				process.env.SECRET_KEY,
				(err: VerifyErrors, decoded: string | JwtPayload) => {
					if (err) {
						throw new ErrorHandler(401, err.message);
					}
				}
			);

			const decodedUser = await serializedCreateUserSchema.validate(
				Jwt.decode(headers.authorization?.split(' ')[1])
			);

			if (decodedUser.isAdm) {
				(validated as User).password = await hash(
				(validated as User).password,
				10
			);
				const user: User = await userRepository.save(validated as User);
				return {
					status: 201,
					messege: await serializedCreateUserSchema.validate(user, {
						stripUnknown: true,
					}),
				};
			} else {
				return {
					status: 201,
					messege: { error: 'missing admin permision' },
				};
			}
		}

		if (!(validated as User).isAdm) {
			(validated as User).password = await hash(
				(validated as User).password,
				10
			);
			const user: User = await userRepository.save(validated as User);

			return {
				status: 201,
				messege: await serializedCreateUserSchema.validate(user, {
					stripUnknown: true,
				}),
			};
		}

		return {
			status: 401,
			messege: {
				name: 'JsonWebTokenError',
				message: 'jwt malformed',
			},
		};
	};

	getAll = async () => {
		const users = await userRepository.all();

		return getAllUsersSchema.validate(users, {
			stripUnknown: true,
		});
	};
}

export default new userService();
