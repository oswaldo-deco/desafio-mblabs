import { handleError } from "../errors/appError";
import { Request, Response } from "express";
import { AppError } from "../errors/appError";

import createPartnerService from "../services/partners/cretePartner.service";
import listPartnerService from "../services/partners/listPartner.service";
import listAllPartnersService from "../services/partners/listAllPartners.service";
import listPartnerEventsService from "../services/partners/listPartnerEvents.service";
import updatePartnerService from "../services/partners/updatePartner.service";
import deletePartnerService from "../services/partners/deletePartner.service";

export default class PartnerControllers {
  async create(req: Request, res: Response) {
    try {
      const { name, description, logo } = req.body;

      const newPartner = await createPartnerService({
        name,
        description,
        logo,
      });

      return res.status(201).send(newPartner);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const partners = await listAllPartnersService();

      return res.status(200).send(partners);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const partner = await listPartnerService(id);

      return res.status(200).send(partner);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async listEventByPartner(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const partnerEvents = await listPartnerEventsService(id);

      return res.status(200).send(partnerEvents);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, logo, active } = req.body;

      const partner = await updatePartnerService({
        id,
        name,
        description,
        logo,
        active,
      });

      return res.status(201).send(partner);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const partner = await deletePartnerService(id);

      return res.status(200).send(partner);
    } catch (error) {
      if (error instanceof AppError) {
        handleError(error, res);
      }
    }
  }
}
