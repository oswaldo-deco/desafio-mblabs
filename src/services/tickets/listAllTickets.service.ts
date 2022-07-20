import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/ticket.entity";


const listAllTicketsService = async () => {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  return ticketRepository
    .createQueryBuilder("ticket")
    .leftJoinAndSelect("ticket.event", "event")
    .select([
      "ticket.id",
      "ticket.type",
      "ticket.price",
      "ticket.observations",
      "ticket.amount",
      "ticket.amount_bought",
      "event.name"
    ])
    .getMany()
};

export default listAllTicketsService;
