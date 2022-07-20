import { Router } from "express";
import PartnerControllers from "../controllers/partners.controller";

import { authAdmin } from "../middlewares/authAdmin.middleware";
import { authToken } from "../middlewares/authToken.middleware";


const partnersControllers = new PartnerControllers()

const partnersRouters = Router()

partnersRouters.get("", partnersControllers.listAll)
partnersRouters.get("/:id", partnersControllers.listById)
partnersRouters.get("/:id/events", partnersControllers.listEventByPartner)
partnersRouters.use(authToken)
partnersRouters.post("",authAdmin, partnersControllers.create)
partnersRouters.patch("/:id",authAdmin, partnersControllers.update)
partnersRouters.delete("/:id",authAdmin, partnersControllers.delete)

export default partnersRouters