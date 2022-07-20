import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/appError";
import eventsRouters from "./routers/events.routers";
import partnersRouters from "./routers/partners.routers";
import ticketsRouters from "./routers/tickets.router";
import usersRouters, { loginRouter } from "./routers/users.routers";

const app = express()

app.use(express.json())

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  });

app.use("/users", usersRouters)
app.use("/events", eventsRouters)
app.use("/partners", partnersRouters)
app.use("/tickets", ticketsRouters)
app.use("/login", loginRouter)


export default app