import { Router } from "express";
import EventsControllers from "../controllers/events.controllers";

const eventsController = new EventsControllers()

const eventsRouters = Router()

eventsRouters.post("", eventsController.create)
eventsRouters.get("", eventsController.listAll)
eventsRouters.get("/:id", eventsController.listById)
eventsRouters.patch("/:id", eventsController.update)
eventsRouters.delete("/:id", eventsController.delete)
eventsRouters.post("/:id/ticket", eventsController.createEventTicket)

export default eventsRouters