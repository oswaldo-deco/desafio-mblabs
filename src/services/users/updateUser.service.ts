import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUpdatedUser } from "../../interfaces/users";
import bcrypt from "bcrypt";
import { checkId } from "../../utils/checkId.utils";

const updateUserService = async ({
  id,
  email,
  password,
  name
}: IUpdatedUser) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  if (!checkId(users, id)) {
    throw new AppError(404, "User not found");
  }

  const emailFound = users.find((user) => user.email === email);
  if (emailFound) {
    throw new AppError(409, "Email already in use");
  }

  await userRepository.update(id, {
    name: name,
    email: email,
    password: password && bcrypt.hashSync(password, 10),
  });

  return {
    message: "User successfully updated",
    UpdatedInfo: {
      name: name,
      email: email,
      password: password
    }
  };
};

export default updateUserService;