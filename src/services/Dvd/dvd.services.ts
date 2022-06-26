import { Request } from 'express';
import { Dvd } from '../../entities/Dvd';
import {
	cartRepository,
	dvdReposiroty,
	stockRepository,
	userRepository,
} from '../../repositories';
import * as dotenv from 'dotenv';
import Jwt from 'jsonwebtoken';
import { serializedCreateUserSchema } from '../../schemas/user';

import { Stock } from '../../entities/Stock';
import { Cart } from '../../entities/Cart';

dotenv.config();

class dvdServices {
	createDvd = async ({ headers, body }: Request) => {
		if (headers.authorization.split(' ')[1]) {
			const decodedUser = await serializedCreateUserSchema.validate(
				Jwt.decode(headers.authorization?.split(' ')[1])
			);

			if (decodedUser.isAdm) {
				const dvds = body.dvds;
				const response = dvds.map(async (item) => {
					const stock: Stock = await stockRepository.save(item);
					const dvds: Dvd = await dvdReposiroty.save({ ...item, stock });
					return { status: 200, message: dvds };
				});
			}
		}
		return {
			status: 401,
			message: { error: 'missing admin permission' },
		};
	};

	getAll = async () => {
		const dvds: Dvd[] = await dvdReposiroty.all();

		return { status: 200, message: dvds };
	};
	getAllCart = async () => {
		const cart: Cart[] = await cartRepository.all();

		return { status: 200, message: cart };
	};

	buyDvds = async ({ body }: Request, token, dvdId) => {
		const emailUser = (
			await serializedCreateUserSchema.validate(Jwt.decode(token))
		).email;

		const user = await userRepository.findOne({ email: emailUser });

		const dvd = await dvdReposiroty.findOne({ dvdId: dvdId.dvdId });

		if (dvd.stock.quantity <= body.quantity) {
			return {
				status: 422,
				message: {
					error: `current stock:${dvd.stock.quantity}, received damand ${body.quantity}`,
				},
			};
		}

		const cart = {
			total: dvd.stock.price * body.quantity,
			paid: false,
		};

		const newCart = await cartRepository.save({
			...cart,
			dvd,
			user,
		});
		console.log(dvd);

		return { status: 200, message: newCart };
	};
}

export default new dvdServices();
