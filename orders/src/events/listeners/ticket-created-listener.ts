import {
  TicketCreatedEvent,
  Subjects,
  Listener,
} from "@joker7nbt-ticketing/common";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "orders-service";
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log(msg);
  }
}
