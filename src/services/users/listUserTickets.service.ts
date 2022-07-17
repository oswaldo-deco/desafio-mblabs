import { AppDataSource } from "../../data-source";
import { User_Ticket } from "../../entities/user_tickets.entity";
import { AppError } from "../../errors/appError";

const listUserTicketsService = async (id: string) => {
    const userTicketsRepository = AppDataSource.getRepository(User_Ticket);

    const users = await userTicketsRepository.find()

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
      .where({userId:id})
      .getMany()
  };
  
  export default listUserTicketsService; 
  