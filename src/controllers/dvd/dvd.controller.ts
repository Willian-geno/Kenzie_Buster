import { Request, Response } from 'express';
import { request } from 'http';
import { dvdServices } from '../../services';

class DvdController {
	createDvd = async (req: Request, res: Response) => {
		const user = await dvdServices.createDvd(req);

		return res.status(user.status).json(await user.message);
	};

	getAll = async (request: Request, response: Response) => {
		const users = await dvdServices.getAll();

		return response.status(200).json({ users });
	};
	getAllCart = async (request: Request, response: Response) => {
		const cart = await dvdServices.getAllCart();

		return response.status(200).json(cart.message);
	};

	buyDvds = async (request: Request, response: Response) => {
		const newCart = await dvdServices.buyDvds(
			request,
			request.headers.authorization.split(' ')[1],
			request.params
		);

		return response.status(newCart.status).json(newCart.message);
	};
}

export default new DvdController();
