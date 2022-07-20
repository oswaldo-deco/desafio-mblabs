import { Event } from "../../entities/event.entity";
import { Ticket } from "../../entities/ticket.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { IEventCreate } from "../../interfaces/events";
import { Partner } from "../../entities/partner.entity";
import { checkId } from "../../utils/checkId.utils";

const createEventService = async ({
    name,
    description,
    localization,
    adress,
    date,
    partners,
    tickets
}: IEventCreate) => {
    if (!name || !localization || !adress || !date || !partners || !tickets) {
        throw new AppError(422, "Missing data for event creation");
    }
    const eventRepository = AppDataSource.getRepository(Event)
    const event = new Event()
    event.name = name
    event.description = description
    event.localization = localization
    event.adress = adress
    event.date = date
    event.partners = []
    
    const partnerRepository = AppDataSource.getRepository(Partner)
    const partner = await partnerRepository.find();
    partners.forEach((partner_id) => {
        if (!checkId(partner,partner_id)) {
              console.log("oi")
            throw new AppError(404, "Partner not found");
          }
        event.partners.push(partner[0])
    })
    const ticketsArray:any[] = []
    eventRepository.create(event)
    await eventRepository.save(event)
    console.log("oi") 
    const ticketsRepository = AppDataSource.getRepository(Ticket)
    tickets.forEach(async(ticket)=>{
        const newTicket = new Ticket()
        newTicket.type = ticket.type
        newTicket.price = ticket.price
        newTicket.observations = ticket.observations
        newTicket.event = event
        ticketsArray.push({...newTicket, event:true})
        ticketsRepository.create(newTicket)
        await ticketsRepository.save(newTicket)
    })

    return{
        event: event,
        tickets : ticketsArray
    }
}

export default createEventService