export interface ITicketCreate {
  type: string;
  price: number;
  observations: string;
}

export interface ITicketBuy {
  user_id: string;
  ticket_id: string;
}

export interface ITicketUpdate {
  id: string;
  type: string;
  price: number;
  observations: string;
}
