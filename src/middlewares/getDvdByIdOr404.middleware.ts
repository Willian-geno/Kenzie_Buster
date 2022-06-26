import { dvdReposiroty } from '../repositories';
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../errors';

const getDvdByIdOr404 = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { dvdId } = req.params;
	try {
		const dvd = await dvdReposiroty.findOne({ dvdId });

		if (!dvd) {
			throw new ErrorHandler(404, 'Dvd not found.');
		}
		req.dvd = dvd;
	} catch (err) {
		throw new ErrorHandler(404, 'Dvd not found.');
	}

	return next();
};

export default getDvdByIdOr404;
