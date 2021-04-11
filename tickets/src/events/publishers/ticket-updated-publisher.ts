import {
  Publisher,
  TicketUpdatedEvent,
  Subjects,
} from "@joker7nbt-ticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
