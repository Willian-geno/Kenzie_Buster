import * as yup from 'yup';

const createDvdSchema = yup.object().shape({
	dvds: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string().required(),
				duration: yup.string().required(),
				quantity: yup.number().required(),
				price: yup.number().required(),
			})
		)
		.required(),
});
const createDvbBorySchema = yup.object().shape({
	name: yup.string().required(),
	duration: yup.string().required(),
});
const serealizerCreateDvdSchema = yup
	.object()
	.shape({
		dvdId: yup.string().uuid().required(),
		name: yup.string().required(),
		duration: yup.string().required(),
		stock: yup.object().shape({
			quantity: yup.number().required(),
			price: yup.number().required(),
			stockId: yup.string().uuid().required(),
		}),
	})

	.required();

export {
	createDvdSchema,
	createDvbBorySchema,
	serealizerCreateDvdSchema,
};
