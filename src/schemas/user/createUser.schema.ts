import * as yup from "yup";

const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().lowercase().required(),
    isAdm: yup.boolean().default(false).optional(),
    password: yup.string().required(),
});

const serializedCreateUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().lowercase().required(),
    isAdm: yup.boolean().required(),
});

export { createUserSchema, serializedCreateUserSchema };
