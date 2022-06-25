import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import { ErrorHandler } from "../errors";
import { userRepository } from "../repositories";

const verifyUserExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const foundEmailUser: User = await userRepository.findOne({
        email: req.body.email,
    });

    const foundCpfUser: User = await userRepository.findOne({
        cpf: req.body.cpf,
    });

    if (foundEmailUser) {
        throw new ErrorHandler(409, "Email already exists.");
    }

    if (foundCpfUser) {
        throw new ErrorHandler(409, "CPF already exists.");
    }

    return next();
};

export default verifyUserExists;
