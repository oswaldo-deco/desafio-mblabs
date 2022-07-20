import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../errors/appError";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export const authUserOrAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { id } = request.params;
    const user_id = request.userId;
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    const user = users.find((user) => user.id === user_id);
    if (!user?.authorized_email){
        throw new AppError(401, "Your email wasn't validated");
    }
    if (user?.is_admin) {
        return next();
    }

    console.log(request.body)
    
    if (user_id === id) {
        return next();
    } else {
        throw new AppError(401, "Unauthorized access");
    }
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};
