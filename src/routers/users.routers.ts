import { Router } from "express";
import UsersControllers from "../controllers/users.controllers";

const usersControllers = new UsersControllers()

const usersRouters = Router()
export const loginRouter = Router()

usersRouters.post("", usersControllers.create)
usersRouters.get("", usersControllers.listAll)
usersRouters.get("/:id", usersControllers.listById)
usersRouters.get("/info", usersControllers.listSelf)
usersRouters.get("/:id/tickets", usersControllers.listTickets)
usersRouters.patch("/:id", usersControllers.update)
usersRouters.post("/:id/validate", usersControllers.validateEmail)
usersRouters.delete("/:id", usersControllers.delete)

loginRouter.post("", usersControllers.login)

export default usersRouters