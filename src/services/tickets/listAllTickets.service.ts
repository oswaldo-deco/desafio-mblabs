import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/ticket.entity";


const listAllTicketsService = async () => {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  return ticketRepository
    .createQueryBuilder("ticket")
    .leftJoinAndSelect("ticket.eventId", "ticket")
    .select([
      "ticket.id",
      "ticket.name",
      "ticket.created_at",
      "event.name"
    ])
    .getMany()
};

export default listAllTicketsService;
