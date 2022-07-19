import { ITicketCreate } from "../tickets";

export interface IEventCreate {
  name: string;
  description: string;
  localization: string;
  adress: string;
  date: Date;
  partners: string[];
  tickets: ITicketCreate[];
}

export interface IEventUpdate {
  id: string;
  name: string;
  description: string;
  localization: string;
  adress: string;
  date: Date;
}
