import mongoose from "mongoose";

//attrs for type checking with typescript
interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

//interface for type checking of schema
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

//interface for type checking of each Payment document
//solve the issue unpredicted additional properties in mongoose model
interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
}

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
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

PaymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  PaymentSchema
);

export { Payment };
