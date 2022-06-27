import { Router } from 'express';
import { dvdController } from '../controllers';
import {
	getDvdByIdOr404,
	validateSchema,
	validateToken,
} from '../middlewares';
import { createDvdSchema } from '../schemas';

const dvdRouter = Router();

dvdRouter.post(
	'/register',
	validateToken,
	validateSchema(createDvdSchema),
	dvdController.createDvd
);

dvdRouter.get('', dvdController.getAll);
dvdRouter.get('/cart', dvdController.getAllCart);
dvdRouter.post(
	'/buy/:dvdId',
	getDvdByIdOr404,
	validateToken,
	dvdController.buyDvds
);

export default dvdRouter;
