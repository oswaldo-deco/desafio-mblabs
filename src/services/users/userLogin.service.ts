import { IUserLogin } from "../../interfaces/users";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../../errors/appError";

const userLoginService = async ({email, password}:IUserLogin) => {
    if (!email||!password){
        throw new AppError(422,"Missing email/password")}
    
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()
        
    const account = users.find(user => user.email === email)

    if(!account){
        throw new AppError(403, "Wrong email/password")
    }

    if(!bcrypt.compareSync(password, account.password)){
        throw new AppError(403, "Wrong email/password")
    }

    const token = jwt.sign({
        email: email,
        id: account.id
        },
        String(process.env.JWT_SECRET),
        {expiresIn: "7d",}
    )

    return token
}

export default userLoginService