import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";

const createTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "test",
    price: 10,
  });
};

it("should return 404 if the provided id is not existed", async function () {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "test",
      price: 10,
    })
    .expect(404);
});

it("should return 401 if user have not signed in", async function () {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "test",
      price: 10,
    })
    .expect(401);
});

it("should return 401 if user does not own the ticket", async function () {
  const res = await createTicket();
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin("anotherId"))
    .send({
      title: "test",
      price: 10,
    })
    .expect(401);
});

it("should return 400 if user provides invalid title and price", async function () {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: -10,
    })
    .expect(400);
});

it("should update the ticket if provide valid inputs", async function () {
  const res = await createTicket();
  const updateTicket = await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "updated",
      price: 10,
    })
    .expect(200);
  expect(updateTicket.body.title).toEqual("updated");
});

it("should reject updates if the ticket is reserved", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "test",
      price: 10,
    });

  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "updated",
      price: 100,
    })
    .expect(400);
});
