import { Router } from "express";
import EventsControllers from "../controllers/events.controllers";

import { authAdmin } from "../middlewares/authAdmin.middleware";
import { authToken } from "../middlewares/authToken.middleware";


const eventsController = new EventsControllers()

const eventsRouters = Router()

eventsRouters.get("/search/:search", eventsController.search)
eventsRouters.get("", eventsController.listAll)
eventsRouters.get("/:id", eventsController.listById)
eventsRouters.use(authToken)
eventsRouters.post("",authAdmin, eventsController.create)
eventsRouters.patch("/:id",authAdmin, eventsController.update)
eventsRouters.delete("/:id",authAdmin, eventsController.delete)
eventsRouters.post("/:id/ticket",authAdmin, eventsController.createEventTicket)

export default eventsRouters