import { handleError } from "../errors/appError";
import { Request, Response } from "express";
import { AppError } from "../errors/appError";

import createEventService from "../services/events/createEvent.service";
import listAllEventsService from "../services/events/listAllEvents.service";
import listEventService from "../services/events/listEvent.service";
import updateEventService from "../services/events/updateEvent.service";
import deleteEventService from "../services/events/deleteEvent.service";
import createEventTicketService from "../services/events/createEventTicket.service";

export default class EventsControllers {
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        description,
        localization,
        adress,
        date,
        partners,
        tickets,
      } = req.body;

      const newEvent = await createEventService({
        name,
        description,
        localization,
        adress,
        date,
        partners,
        tickets,
      });

      return res.status(201).send(newEvent);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const events = await listAllEventsService();

      return res.status(200).send(events);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const event = await listEventService(id);

      return res.status(200).send(event);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, adress, date, localization } = req.body;

      const event = updateEventService({
        id,
        name,
        description,
        adress,
        date,
        localization,
      });

      return res.status(201).send(event);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const event = await deleteEventService(id);

      return res.status(200).send(event);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async createEventTicket(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { type, price, observations } = req.body;

      const ticket = await createEventTicketService({
        event_id:id,
        type,
        price,
        observations,
      });

      return res.status(200).send(ticket);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}
