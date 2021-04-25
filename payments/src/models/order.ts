import mongoose from "mongoose";
import { OrderStatus } from "@joker7nbt-ticketing/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import {
  Ticket,
  TicketDoc,
  TicketSchema,
} from "../../../orders/src/models/ticket";

//attrs for type checking with typescript
interface OrderAttrs {
  id: string;
  status: OrderStatus;
  userId: string;
  version: number;
  // price of all tickets
  price: number;
}

//interface for type checking of schema
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
  findByEvent(event: { id: string; version: number }): Promise<OrderDoc | null>;
}

//interface for type checking of each Order document
//solve the issue unpredicted additional properties in mongoose model
interface OrderDoc extends mongoose.Document {
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
    },
    version: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

OrderSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Order.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    status: attrs.status,
    version: attrs.version,
    userId: attrs.userId,
    price: attrs.price,
  });
};

OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin);

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
