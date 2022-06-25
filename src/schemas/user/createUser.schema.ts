import * as yup from "yup";

const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().lowercase().required(),
    password: yup.string().required(),
    cpf: yup.string().required(),
    license: yup.boolean().default(false).optional(),
    licenseCategory: yup.string().uppercase().required(),
});

const serializedCreateUserSchema = yup.object().shape({
    userId: yup.string().uuid().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    license: yup.boolean().required(),
    licenseCategory: yup.string().required(),
});

export { createUserSchema, serializedCreateUserSchema };
