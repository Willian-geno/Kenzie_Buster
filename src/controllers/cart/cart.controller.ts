import { Request, Response } from 'express';
import { request } from 'http';
import { cartSerices } from '../../services';

class DvdController {
	payCart = async (req: Request, res: Response) => {
		const cart = await cartSerices.payCart(req);

		return res.status(cart.status).json(cart.message);
	};
}

export default new DvdController();
