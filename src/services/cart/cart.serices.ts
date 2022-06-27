import { Request } from 'express';
import {
	cartRepository,
	stockRepository,
} from '../../repositories';
import * as dotenv from 'dotenv';
import { Cart } from '../../entities/Cart';

dotenv.config();

class cartServices {
	payCart = async ({ headers, params }: Request) => {
		const cart: Cart = await cartRepository.findOne({
			carId: params.cartId,
		});
		if(cart.paid){
			return {status:400, message:{Error:"completed purchase"}}
		}

		const __ = await cartRepository.update(params.cartId, {
			paid: true,
		});
		const _ = await stockRepository.update(
			cart.dvd.stock.stockId,
			{ quantity: cart.dvd.stock.quantity - cart.total / cart.dvd.stock.price }
			);
			
		const cartUpdate: Cart = await cartRepository.findOne({
			carId: params.cartId,
		})

		return { status: 200, message: cartUpdate };
	};
}

export default new cartServices();
