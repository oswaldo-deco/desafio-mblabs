import { AppDataSource } from "../../data-source";
import { ITicketBuy } from "../../interfaces/tickets";
import { Ticket } from "../../entities/ticket.entity";
import { User } from "../../entities/user.entity";
import { User_Ticket } from "../../entities/user_tickets.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const ticketBuyService = async ({
    user_id,
    ticket_id,
}: ITicketBuy) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find()
    const userTicketsRepository = AppDataSource.getRepository(User_Ticket);
    const userTickets = await userTicketsRepository.find()
    const ticketsRepository = AppDataSource.getRepository(Ticket);
    const tickets = await ticketsRepository.find()

    if (!checkId(users, user_id)) {
        throw new AppError(404, "User not found");
    }

    if (!checkId(tickets, ticket_id)) {
        throw new AppError(404, "Ticket not found");
    }

    const user = users.find((user) => user.id === user_id)
    const ticket = tickets.find((ticket)=>ticket.id==ticket_id)
    if(ticket!.amount<=ticket!.amount_bought){
        throw new AppError(406, "Ticket was sold out");
    }
    const userTicket = new User_Ticket()
    userTicket.ticket = ticket!
    userTicket.user = user!
    userTicket.price_paid = ticket!.price

    userTicketsRepository.create(userTicket)
    await userTicketsRepository.save(userTicket)

    await ticketsRepository.update(ticket!.id,{
        amount_bought: ticket!.amount_bought + 1
    })

    return userTicket
}

export default ticketBuyService