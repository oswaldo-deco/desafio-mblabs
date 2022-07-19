import { Router } from "express";
import PartnerControllers from "../controllers/partners.controller";

const partnersControllers = new PartnerControllers()

const partnersRouters = Router()

partnersRouters.post("", partnersControllers.create)
partnersRouters.get("", partnersControllers.listAll)
partnersRouters.get("/:id", partnersControllers.listById)
partnersRouters.get("/:id/events", partnersControllers.listEventByPartner)
partnersRouters.patch("/:id", partnersControllers.update)
partnersRouters.delete("/:id", partnersControllers.delete)

export default partnersRouters