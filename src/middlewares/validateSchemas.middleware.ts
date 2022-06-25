import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { ErrorHandler } from "../errors";

const validateSchema =
    (shape: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {

        try {
    
            const validated = await shape.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            req.validated = validated;

            return next();
        } catch (error) {
            throw new ErrorHandler(400, { message: error.errors });
        }
    };

export default validateSchema;
