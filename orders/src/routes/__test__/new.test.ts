import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@joker7nbt-ticketing/common";
import { natsWrapper } from "../../nats-wrapper";

const ticketId = mongoose.Types.ObjectId().toString();

it("should return an error if the ticket is not existed", async () => {
  const ticketId = mongoose.Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("should return an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({ id: ticketId, price: 10, title: "test" });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.CREATED,
    userId: "1234",
    expireAt: new Date(),
    ticket,
  });
  await order.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("should create an order if ticket is valid", async () => {
  const ticket1 = Ticket.build({ id: ticketId, price: 10, title: "test" });
  const ticket2 = Ticket.build({
    id: mongoose.Types.ObjectId().toString(),
    price: 10,
    title: "test",
  });
  await ticket1.save();
  await ticket2.save();
  const order = Order.build({
    status: OrderStatus.CREATED,
    userId: "1234",
    expireAt: new Date(),
    ticket: ticket1,
  });
  await order.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket2.id })
    .expect(201);
});

it("should emits an order created event", async () => {
  const ticket = Ticket.build({
    id: ticketId,
    title: "concert",
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
