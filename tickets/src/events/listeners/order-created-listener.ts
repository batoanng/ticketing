import {
  Subjects,
  Listener,
  OrderCreatedEvent,
  NotFoundError,
} from "@joker7nbt-ticketing/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    ticket.set({ orderId: data.id });
    await ticket.save();
    const { id, version, price, title, userId } = ticket;
    await new TicketUpdatedPublisher(this.client).publish({
      id,
      version,
      price,
      title,
      userId,
      orderId: data.id,
    });

    msg.ack();
  }
}
