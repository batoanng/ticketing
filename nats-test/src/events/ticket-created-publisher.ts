import {
  Publisher,
  TicketCreatedEvent,
  Subjects,
} from "@joker7nbt-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
