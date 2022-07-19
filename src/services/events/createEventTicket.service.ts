import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/ticket.entity";
import { AppError } from "../../errors/appError";
import { ITicketEventCreate } from "../../interfaces/tickets";
import { checkId } from "../../utils/checkId.utils";
import { Event } from "../../entities/event.entity";

const createEventTicketService = async({
  event_id,
  type,
  price,
  observations,
}: ITicketEventCreate) => {
    const ticketsRepository = AppDataSource.getRepository(Ticket)
    const eventRepository = AppDataSource.getRepository(Event)

    const events = await eventRepository.find({})

    if (!checkId(events,event_id)) {
        throw new AppError(404, "Event not found");
      }

      const event = await eventRepository.find({
        where: { id: event_id },
      });

    const ticket = new Ticket()
    ticket.type = type
    ticket.price = price
    ticket.observations = observations
    ticket.event = event[0]

    ticketsRepository.create(ticket)
     await ticketsRepository.save(ticket)

     return ticket

}

export default createEventTicketService
