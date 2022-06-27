import * as yup from "yup";

const getAllUsersSchema = yup
    .array()
    .of(
        yup.object().shape({
            isAdm: yup.string().required(),
            email: yup.string().required(),
            name: yup.string().required(),
            userId: yup.string().uuid().required(),
        })
    )
    .required();

export default getAllUsersSchema;
