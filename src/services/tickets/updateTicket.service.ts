import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/ticket.entity";
import { AppError } from "../../errors/appError";
import { ITicketUpdate } from "../../interfaces/tickets";
import { checkId } from "../../utils/checkId.utils";

const updateTicketService = async ({
  id,
  type,
  price,
  observations
}: ITicketUpdate) => {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  const tickets = await ticketRepository.find();

  if (!checkId(tickets, id)) {
    throw new AppError(404, "Ticket not found");
  }

  await ticketRepository.update(id, {
    type: type,
    price: price,
    observations: observations
  });

  return {
    message: "Ticket successfully updated",
    UpdatedInfo: {
        type: type,
        price: price,
        observations: observations
  }}
};

export default updateTicketService;