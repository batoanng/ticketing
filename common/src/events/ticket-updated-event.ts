import { Subjects } from "./subjects";

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    id: string;
    version: number;
    price: number;
    title: string;
    userId: string;
    orderId?: string;
  };
}
