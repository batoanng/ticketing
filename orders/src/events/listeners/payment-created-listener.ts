import {
  Subjects,
  Listener,
  NotFoundError,
  OrderStatus,
  PaymentCreatedEvent,
} from "@joker7nbt-ticketing/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "../queue-group-name";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const { id, orderId, stripeId } = data;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    order.set({
      status: OrderStatus.COMPLETED,
    });
    await order.save();

    msg.ack();
  }
}
