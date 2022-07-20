import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../errors/appError";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export const authAdmin = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const user_id = request.userId
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        const user = users.find((user) => user.id === user_id)

        if(user?.is_admin){
            next()
        }
        else{
            throw new AppError(401, "Unauthorised access");
        }
    } catch (error) {
        if (error instanceof AppError) {
          handleError(error, response);
        }
      }
}