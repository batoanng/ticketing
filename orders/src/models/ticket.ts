import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@joker7nbt-ticketing/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

//attrs for type checking with typescript
interface TicketAttrs {
  id: string;
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
  version: number;
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

export const TicketSchema = new mongoose.Schema(
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
    //@ts-ignore
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
  const { id, title, price } = attrs;
  return new Ticket({
    _id: id,
    title,
    price,
  });
};

TicketSchema.set("versionKey", "version");
TicketSchema.plugin(updateIfCurrentPlugin);

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", TicketSchema);

export { Ticket };
