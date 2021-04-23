import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@joker7nbt-ticketing/common";

it("should return an error if user is not authorized", async () => {
  await request(app).get("/api/orders").expect(401);
});

it("should return orders belong to user", async () => {
  const ticketId = mongoose.Types.ObjectId().toString();
  const userId = "1234";
  const ticket = Ticket.build({ id: ticketId, price: 10, title: "test" });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.CREATED,
    userId: "1234",
    expireAt: new Date(),
    ticket,
  });
  await order.save();
  const orders1 = await request(app)
    .get("/api/orders")
    .set("Cookie", global.signin(userId));
  expect(orders1.body.length).toEqual(1);
  const orders2 = await request(app)
    .get("/api/orders")
    .set("Cookie", global.signin("wrongId"));
  expect(orders2.body.length).toEqual(0);
});
