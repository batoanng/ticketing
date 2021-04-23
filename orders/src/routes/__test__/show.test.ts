import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

const ticketId = mongoose.Types.ObjectId().toString();

it("fetches the order", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: ticketId,
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error if one user tries to fetch another users order", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: ticketId,
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const userId = "1234";
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin(userId))
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin("wrongId"))
    .send()
    .expect(401);
});
