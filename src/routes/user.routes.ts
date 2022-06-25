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
userRouter.get("/:userId", getUserByIdOr404, userController.getById);
userRouter.patch(
    "/:userId",
    validateToken,
    getUserByIdOr404,
    userPermission,
    userController.updateUser
);
userRouter.delete(
    "/:userId",
    validateToken,
    getUserByIdOr404,
    userPermission,
    userController.deleteUser
);

export default userRouter;
