import request from "supertest";
import { app } from "../../app";

it("should return not found error for invalid ticket id", async function () {
  await request(app)
    .get(`/api/tickets/wrongId`)
    .set("Cookie", global.signin())
    .send({})
    .expect(400);
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
