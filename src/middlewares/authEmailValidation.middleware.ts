import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, handleError } from "../errors/appError";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export const authEmailValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const {id} = request.params
    const {token} = request.body
    if (!token) {
      throw new AppError(401, "Missing validation token");
    }

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new AppError(401, "Invalid token");
        }
        if(decoded.validation_key!==process.env.VALIDATION_KEY){
          throw new AppError(401, "Invalid token");
        }
        const userFound = users.find(
          (user) => user.email === decoded.email && user.id === id
        );
        if (userFound) {
          return next();
        }
        throw new AppError(401, "Invalid token");
      }
    );
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
