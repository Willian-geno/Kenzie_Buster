import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../errors';
import Jwt from 'jsonwebtoken';
import { serializedCreateUserSchema } from '../schemas';

const userPermission = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const decodedUser = await serializedCreateUserSchema.validate(
		Jwt.decode(req.headers.authorization?.split(' ')[1])
	);

	if (!decodedUser?.isAdm) {
		throw new ErrorHandler(403, 'Você não pode acessar essa rota');
	}

	return next();
};

export default userPermission;
