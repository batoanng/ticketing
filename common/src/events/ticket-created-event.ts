import { Subjects } from "./subjects";

export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    version: number;
    price: number;
    title: string;
    userId: string;
  };
}
