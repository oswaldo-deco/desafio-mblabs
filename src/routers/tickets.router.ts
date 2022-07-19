import { Router } from "express";
import TicketsControllers from "../controllers/tickets.controllers";


const ticketsControllers = new TicketsControllers()

const ticketsRouters = Router()

ticketsRouters.post("/:id/buy", ticketsControllers.ticketBuy)
ticketsRouters.get("", ticketsControllers.listAll)
ticketsRouters.get("/:id", ticketsControllers.listById)
ticketsRouters.patch("/:id", ticketsControllers.update)
ticketsRouters.delete("/:id", ticketsControllers.delete)

export default ticketsRouters