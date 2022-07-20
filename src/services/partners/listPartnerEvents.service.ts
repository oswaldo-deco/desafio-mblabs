import { Event } from "../../entities/event.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";
import { Partner } from "../../entities/partner.entity";

const listPartnerEventsService = async (id:string) => {
    const eventRepository = AppDataSource.getRepository(Event)
    const partnerRepository = AppDataSource.getRepository(Partner)
    
    const partners = await partnerRepository.find()
    
    if(!checkId(partners,id)){
        throw new AppError(404, "Partner not found");
    }
    return await eventRepository
    .createQueryBuilder("event")
    .leftJoin("event.partners", "partner")
    .select([
        "event.id",
        "event.name",
        "event.description",
        "event.localization",
        "event.adress",
        "event.date",
        "event.created_at",
        "event.updated_at"
    ]).where("partner.id = :id", {id:id}).getMany()
}

export default listPartnerEventsService