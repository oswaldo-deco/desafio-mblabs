import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/ticket.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const deleteTicketService = async (id:string) => {
    const ticketRepository = AppDataSource.getRepository(Ticket)

    const tickets = await ticketRepository.find()
    if (!checkId(tickets,id)) {
        
        throw new AppError(404, "Ticket not found");
    }

    await ticketRepository.delete(id)

    return { message: "Ticket deleted with success" }
}

export default deleteTicketService