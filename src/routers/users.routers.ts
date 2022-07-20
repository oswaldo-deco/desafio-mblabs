import { Router } from "express";
import UsersControllers from "../controllers/users.controllers";

import { authEmailValidation } from "../middlewares/authEmailValidation.middleware";
import { authAdmin } from "../middlewares/authAdmin.middleware";
import { authToken } from "../middlewares/authToken.middleware";
import { authUserOrAdmin } from "../middlewares/authUserOrAdmin.middleware";


const usersControllers = new UsersControllers()

const usersRouters = Router()
export const loginRouter = Router()

usersRouters.post("", usersControllers.create)
usersRouters.get("", usersControllers.listAll)
usersRouters.get("/info",authToken, usersControllers.listSelf)
usersRouters.get("/:id", usersControllers.listById)
usersRouters.post("/:id/validate",authEmailValidation, usersControllers.validateEmail)
usersRouters.use(authToken)
usersRouters.get("/:id/tickets",authUserOrAdmin, usersControllers.listTickets)
usersRouters.patch("/:id",authUserOrAdmin, usersControllers.update)
usersRouters.delete("/:id",authUserOrAdmin, usersControllers.delete)

loginRouter.post("", usersControllers.login)

export default usersRouters