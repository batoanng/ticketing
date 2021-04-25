import {
  Subjects,
  Listener,
  OrderCancelledEvent,
  NotFoundError,
  OrderStatus,
} from "@joker7nbt-ticketing/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../queue-group-name";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = await Order.findByEvent({
      id: data.id,
      version: data.version,
    });
    if (!order) {
      throw new NotFoundError();
    }
    order.set({ status: OrderStatus.CANCELLED });
    await order.save();

    msg.ack();
  }
}
