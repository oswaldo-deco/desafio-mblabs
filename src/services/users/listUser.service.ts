import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const listUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find()

    if (!checkId(users,id)){
        throw new AppError(404, "User not found")
    }
   
    return userRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.email",
        "user.created_at",
        "user.updated_at",
        "user.authorized_email"
      ])
      .where({id:id})
      .getOne
  };
  
  export default listUserService;
  