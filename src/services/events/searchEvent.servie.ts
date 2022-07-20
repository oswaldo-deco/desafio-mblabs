import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/event.entity";


const searchEventsService = async (search:string) => {
  const eventRepository = AppDataSource.getRepository(Event);

  const events = await eventRepository.find()
  const searchResult = events.filter((event)=>{
        return(
        event.name.toLowerCase().includes(search.toLowerCase()) || event.description.toLocaleLowerCase().includes(search.toLowerCase()) )
    })

    console.log (searchResult)

  return searchResult
};

export default searchEventsService;
