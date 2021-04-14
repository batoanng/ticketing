import {
  TicketUpdatedEvent,
  Subjects,
  TicketCreatedEvent,
  Listener,
} from "@joker7nbt-ticketing/common";
import { Message } from "node-nats-streaming";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = "test";
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log(msg);
  }
}
