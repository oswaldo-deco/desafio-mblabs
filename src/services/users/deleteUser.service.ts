import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  if (!checkId(users,id)) {
    throw new AppError(404, "User not found");
  }

  await userRepository.delete(id);

  return { message: "User deleted with success" }
};

export default deleteUserService;