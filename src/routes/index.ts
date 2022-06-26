import { Express } from "express";
import cartRouter from "./cart.router";
import dvdRouter from "./dvd.routers";
import userRouter from "./user.routes";

const registerRouters = (app: Express): void => {
    app.use("/api/users", userRouter);
    app.use("/api/dvds", dvdRouter)
    app.use("/api/carts", cartRouter)
};

export default registerRouters;
