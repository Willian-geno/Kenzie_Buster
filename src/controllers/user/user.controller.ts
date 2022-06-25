import { Request, Response } from "express";
import { userService } from "../../services";

class UserController {
    loginUser = async (req: Request, res: Response) => {
        const { status, message } = await userService.loginUser(req);

        return res.status(status).json(message);
    };

    createUser = async (req: Request, res: Response) => {
        const user = await userService.createUser(req);

        return res.status(201).json(user);
    };

    getById = async (request: Request, response: Response) => {
        const user = await userService.getUserById(request);

        return response.status(200).json(user);
    };

    getAll = async (request: Request, response: Response) => {
        const users = await userService.getAll();

        return response.status(200).json({ users });
    };

    updateUser = async (request: Request, response: Response) => {
        const updateUser = await userService.updateUser(request);

        return response.status(200).json(updateUser);
    };

    deleteUser = async (req: Request, res: Response) => {
        const { status, message } = await userService.deleteUser(req);

        return res.status(status).json(message);
    };
}

export default new UserController();
