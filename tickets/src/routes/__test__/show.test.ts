import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("should return not found error for invalid ticket id", async function () {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});

it("should return a ticket for valid ticket id", async function () {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
      title: "test",
    });
  await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(200);
});
