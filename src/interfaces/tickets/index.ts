export interface ITicketCreate {
  type: string;
  price: number;
  observations: string;
  amount:number
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

export interface ITicketEventCreate {
  event_id: string;
  type: string;
  price: number;
  observations: string;
  amount: number
}
