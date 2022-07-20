import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const listAllUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  return userRepository
    .createQueryBuilder("user")
    .select([
      "user.id",
      "user.name",
      "user.created_at",
      "user.updated_at",
    ])
    .getMany()
};

export default listAllUsersService;
