import {
  TicketUpdatedEvent,
  Subjects,
  TicketCreatedEvent,
  Listener,
} from "@joker7nbt-ticketing/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = QUEUE_GROUP_NAME;

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log(msg);
  }
}
