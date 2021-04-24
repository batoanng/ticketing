import {
  Subjects,
  Listener,
  OrderCancelledEvent,
  NotFoundError,
} from "@joker7nbt-ticketing/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    ticket.set({ orderId: undefined });
    await ticket.save();
    const { id, version, price, title, userId } = ticket;
    await new TicketUpdatedPublisher(this.client).publish({
      id,
      version,
      price,
      title,
      userId,
    });

    msg.ack();
    msg.ack();
  }
}
