import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from "@joker7nbt-ticketing/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
