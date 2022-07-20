import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/event.entity";
import { AppError } from "../../errors/appError";
import { checkId } from "../../utils/checkId.utils";

const deleteEventService = async (id: string) => {
  const eventRepository = AppDataSource.getRepository(Event);

  const events = await eventRepository.find();

  if (!checkId(events,id)) {
    throw new AppError(404, "Event not found");
  }

  await eventRepository.delete(id);

  return { message: "Event deleted with success" }
};

export default deleteEventService;