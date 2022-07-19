import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";
import { Event } from "../../entities/event.entity";
import { IEventUpdate } from "../../interfaces/events";

const updateEventService = async ({
  id,
  name,
  description,
  adress,
  date,
  localization
}: IEventUpdate) => {
  const eventRepository = AppDataSource.getRepository(Event);

  const events = await eventRepository.find();

  if (!checkId(events, id)) {
    throw new AppError(404, "Event not found");
  }

  await eventRepository.update(id, {
    name: name,
    description: description,
    adress: adress,
    date: date,
    localization:localization
  });

  return {
    message: "Partner successfully updated",
    UpdatedInfo: {
        name: name,
        description: description,
        adress: adress,
        date: date,
        localization:localization
  }
};
}

export default updateEventService; 