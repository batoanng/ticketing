import {
  Publisher,
  Subjects,
  OrderCancelledEvent,
} from "@joker7nbt-ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
