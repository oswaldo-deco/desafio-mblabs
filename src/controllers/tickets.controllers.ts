import { handleError } from "../errors/appError";
import { Request, Response } from "express";
import { AppError } from "../errors/appError";

import listTicketService from "../services/tickets/listTicket.service";
import listAllTicketsService from "../services/tickets/listAllTickets.service";
import ticketBuyService from "../services/tickets/buyTicket.service";
import updateTicketService from "../services/tickets/updateTicket.service";
import deleteTicketService from "../services/tickets/deleteTicket.service";

export default class TicketsControllers {
  async listAll(req: Request, res: Response) {
    try {
      const tickets = await listAllTicketsService();

      return res.status(200).send(tickets);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ticket = await listTicketService(id);

      return res.status(200).send(ticket);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async ticketBuy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user_id = req.userId;

      const ticket = await ticketBuyService({ user_id, ticket_id: id });

      return res.status(201).send(ticket);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { type, price, observations } = req.body;
      const ticket = await updateTicketService({
        id,
        type,
        price,
        observations,
      });

      return res.status(201).send({ ticket });
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteTicket = await deleteTicketService(id);

      return res.status(200).send(deleteTicket);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}
