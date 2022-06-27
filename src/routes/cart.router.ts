
import { Router } from 'express';
import { cartController } from '../controllers';
import {
	validateToken,
} from '../middlewares';

const cartRouter = Router();

cartRouter.put(
	'/pay/:cartId',
	validateToken,
	cartController.payCart
);



export default cartRouter;
