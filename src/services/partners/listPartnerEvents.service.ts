import { Event } from "../../entities/event.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const listPartnerEventsService = async (id:string) => {
    const eventRepository = AppDataSource.getRepository(Event)

    const events = await eventRepository.find()

    if(!checkId(events,id)){
        throw new AppError(404, "Partner not found");
    }

    return eventRepository
    .createQueryBuilder("partner")
    .leftJoinAndSelect("partner.events", "event")
    .select([
        "event.id",
        "event.name",
        "event.description",
        "event.localization",
        "event.adress",
        "event.date",
        "event.created_at",
        "event.updated_at"
    ]).where({id:id}).getMany()
}

export default listPartnerEventsService