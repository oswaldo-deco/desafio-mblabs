import { User } from "../../entities/user.entity";
import { IUserCreate } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt"
import { AppError } from "../../errors/appError";
import { checkEmail } from "../../utils/checkEmail.utils";
import jwt from "jsonwebtoken"

const userCreateService = async ({
    name,
    email,
    password
}: IUserCreate) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    const emailAlreadyExists = users.find(user => user.email === email)
    if (emailAlreadyExists) {
        throw new AppError(409, "Email already exists")
    }

    if (!name || !email || !password) {
        throw new AppError(422, "Missing name, email or password");
    }

    const user = new User();
    user.name = name
    user.email = email
    user.password = bcrypt.hashSync(password, 10)
    user.is_admin = checkEmail(email)
    
    userRepository.create(user)
    await userRepository.save(user)

    const validate_email_token = jwt.sign({
        email: email,
        validation_key: process.env.VALIDATION_KEY
        },
        String(process.env.JWT_SECRET),
        {expiresIn: "1d",}
    )

    return {
    user: await userRepository
    .createQueryBuilder("user")
    .select([
      "user.id",
      "user.name",
      "user.email",
      "user.created_at",
      "user.updated_at",
    ])
    .where({ id: user.id })
    .getOne(),
    validation_code: validate_email_token}
};
     
export default userCreateService