import * as yup from "yup";

const getAllUsersSchema = yup
    .array()
    .of(
        yup.object().shape({
            licenseCategory: yup.string().required(),
            license: yup.boolean().required(),
            cpf: yup.string().required(),
            email: yup.string().required(),
            name: yup.string().required(),
            userId: yup.string().uuid().required(),
        })
    )
    .required();

export default getAllUsersSchema;
