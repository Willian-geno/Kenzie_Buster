import validateSchema from './validateSchemas.middleware';
import verifyUserExists from './verifyUserExists.middleware';
import validateToken from './validateToken.middleware';
import getUserByIdOr404 from './getUserByIdOr404.middleware';
import userPermission from './userIsAdm.middleware';
import getDvdByIdOr404 from './getDvdByIdOr404.middleware';

export {
	validateSchema,
	verifyUserExists,
	validateToken,
	getUserByIdOr404,
	getDvdByIdOr404,
	userPermission,
};
