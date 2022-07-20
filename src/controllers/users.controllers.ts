import { handleError } from "../errors/appError";
import { Request, Response } from "express";
import { AppError } from "../errors/appError";

import userCreateService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listAllUsersService from "../services/users/listAllUsers.service";
import listUserService from "../services/users/listUser.service";
import listUserTicketsService from "../services/users/listUserTickets.service";
import updateUserService from "../services/users/updateUser.service";
import userEmailValidateService from "../services/users/userEmailValidation.service";
import userLoginService from "../services/users/userLogin.service";

export default class UsersControllers {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const newUser = await userCreateService({
        name,
        email,
        password,
      });

      return res.status(201).send(newUser);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await userLoginService({ email, password });

      return res.status(201).send({ token });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const users = await listAllUsersService();

      return res.status(200).send(users);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await listUserService(id);

      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listSelf(req: Request, res: Response) {
    try {
      
      const id = req.userId;

      const user = await listUserService(id);

      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listTickets(req: Request, res: Response) {
    try {
      const {id} = req.params;
      

      const user = await listUserTicketsService(id);

      return res.status(200).send(user);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, password, name } = req.body;
      const user = await updateUserService({
        id,
        email,
        password,
        name,
      });

      return res.status(201).send({ user });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async validateEmail(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const validation = await userEmailValidateService(id);

      return res.status(201).send(validation);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteUser = await deleteUserService(id);
      console.log(deleteUser)
      return res.status(200).send(deleteUser);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}
