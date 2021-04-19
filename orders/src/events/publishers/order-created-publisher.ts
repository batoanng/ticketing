import {
  Publisher,
  TicketCreatedEvent,
  Subjects,
  OrderCreatedEvent,
} from "@joker7nbt-ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
