import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/event.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const listEventService = async (id: string) => {
  const eventRepository = AppDataSource.getRepository(Event);

  const events = await eventRepository.find();

  if (!checkId(events, id)) {
    throw new AppError(404, "Event not found");
  }

  return await eventRepository
    .createQueryBuilder("event")
    .leftJoinAndSelect("ticket.eventId", "ticket")
    .select([
        "event.id",
        "event.name",
        "event.description",
        "event.localization",
        "event.adress",
        "event.date",
        "event.created_at",
        "event.updated_at",
        "ticket"
    ])
    .where({ id: id }).getOne();
};

export default listEventService;
