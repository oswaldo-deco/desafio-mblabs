import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { User_Ticket } from "../../entities/user_tickets.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";


const listUserTicketsService = async (id: string) => {
    const userTicketsRepository = AppDataSource.getRepository(User_Ticket);
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()

    if (!checkId(users,id)){
        throw new AppError(404, "User not found")
    }
   
    return userTicketsRepository
      .createQueryBuilder("user_ticket")
      .leftJoinAndSelect("user_ticket.ticket", "ticket")
      .leftJoinAndSelect("ticket.event","event")
      .select([
        "event.name",
        "event.localization",
        "event.adress",
        "event.date",
        "user_ticket.id",
        "ticket.type",
        "ticket.observations",
        "user_ticket.bought_at",
        "user_ticket.price_paid"
      ])
      .where("user_ticket.userId = :id",{id:id})
      .getMany()
  };
  
  export default listUserTicketsService; 
  