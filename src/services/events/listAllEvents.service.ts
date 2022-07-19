import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/event.entity";


const listAllEventsService = async () => {
  const eventRepository = AppDataSource.getRepository(Event);

  return eventRepository
    .createQueryBuilder("event")
    .select([
      "event.id",
      "event.name",
      "event.description",
      "event.localization",
      "event.adress",
      "event.date",
      "event.created_at",
      "event.updated_at"
    ])
    .getMany();
};

export default listAllEventsService;
