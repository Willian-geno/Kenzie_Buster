import { Router } from "express";
import { userController } from "../controllers";
import {
    getUserByIdOr404,
    userPermission,
    validateSchema,
    validateToken,
    verifyUserExists,
} from "../middlewares";
import { createUserSchema, loginUserSchema } from "../schemas";

const userRouter = Router();

userRouter.post(
    "/register",
    validateSchema(createUserSchema),
    verifyUserExists,
    userController.createUser
);
userRouter.post(
    "/login",
    validateSchema(loginUserSchema),
    userController.loginUser
);
userRouter.get("", userController.getAll);



export default userRouter;
