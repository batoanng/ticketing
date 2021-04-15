import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@joker7nbt-ticketing/common";

//attrs for type checking with typescript
interface TicketAttrs {
  title: string;
  price: number;
}

//interface for type checking of schema
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

//interface for type checking of each Ticket document
//solve the issue unpredicted additional properties in mongoose model
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

TicketSchema.methods.isReserved = async function () {
  //this === the ticket call this method
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.CREATED,
        OrderStatus.AWAITING_PAYMENT,
        OrderStatus.COMPLETED,
      ],
    },
  });
  return !!existingOrder;
};

TicketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", TicketSchema);

export { Ticket };
