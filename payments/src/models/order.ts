import mongoose from "mongoose";
import { OrderStatus } from "@joker7nbt-ticketing/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

//attrs for type checking with typescript
interface OrderAttrs {
  id: string;
  status: OrderStatus;
  userId: string;
  // price of all tickets
  price: number;
}

//interface for type checking of schema
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

//interface for type checking of each Order document
//solve the issue unpredicted additional properties in mongoose model
interface OrderDoc extends mongoose.Document {
  id: string;

  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

const OrderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
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
        delete ret.__v;
      },
    },
  }
);

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin);

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
