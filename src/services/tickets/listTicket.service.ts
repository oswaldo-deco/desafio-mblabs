import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/ticket.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const listTicketService = async (id:string) => {

    const ticketRepository = AppDataSource.getRepository(Ticket)

    const tickets = await ticketRepository.find()

    if (!checkId(tickets,id)) {
        throw new AppError(404, "Ticket not found");
    }
   
    return await ticketRepository
    .createQueryBuilder("ticket")
    .leftJoinAndSelect("ticket.event", "event")
    .select([
      "ticket.id",
      "ticket.type",
      "ticket.price",
      "ticket.observations",
      "event.name"
    ])
    .where("ticket.id = :id", {id:id})
    .getOne()
}

export default listTicketService
