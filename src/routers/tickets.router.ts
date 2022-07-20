import { Router } from "express";
import TicketsControllers from "../controllers/tickets.controllers";
import { authEmailValidation } from "../middlewares/authEmailValidation.middleware";
import { authAdmin } from "../middlewares/authAdmin.middleware";
import { authToken } from "../middlewares/authToken.middleware";
import { authUserOrAdmin } from "../middlewares/authUserOrAdmin.middleware";


const ticketsControllers = new TicketsControllers()

const ticketsRouters = Router()

ticketsRouters.get("", ticketsControllers.listAll)
ticketsRouters.get("/:id", ticketsControllers.listById)
ticketsRouters.use(authToken)
ticketsRouters.post("/:id/buy", ticketsControllers.ticketBuy)
ticketsRouters.patch("/:id",authAdmin, ticketsControllers.update)
ticketsRouters.delete("/:id",authAdmin, ticketsControllers.delete)

export default ticketsRouters