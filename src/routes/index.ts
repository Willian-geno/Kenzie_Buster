import { Express } from "express";
import userRouter from "./user.routes";

const registerRouters = (app: Express): void => {
    app.use("/users", userRouter);
};

export default registerRouters;
