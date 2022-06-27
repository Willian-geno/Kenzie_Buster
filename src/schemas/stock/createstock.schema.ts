import * as yup from 'yup';

const createStockSchema = yup.object().shape({
	quantity: yup.string().required(),
	price: yup.string().required(),
});


export default createStockSchema;
