import { Request, Response } from 'express';
import { userService } from '../../services';

class UserController {
	loginUser = async (req: Request, res: Response) => {
		const { status, message } = await userService.loginUser(req);

		return res.status(status).json(message);
	};

	createUser = async (req: Request, res: Response) => {
		const user = await userService.createUser(req);

		//return res.status(user.status).json(user.messege);
	};

	getAll = async (request: Request, response: Response) => {
		const users = await userService.getAll();

		return response.status(200).json({ users });
	};
}

export default new UserController();
