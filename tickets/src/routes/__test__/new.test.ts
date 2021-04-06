import request from "supertest";
import { app } from "../../app";

it("should has a router handler for /api/tickets for post requests", async function () {
  const res = await request(app).post("/api/tickets").send();
  expect(res.status).not.toEqual(404);
});

it("should only be accessed if the user sign in", async function () {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(res.status).not.toEqual(401);
});

it("should return an error if invalid title is provided", async function () {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("should return an error if invalid price is provided", async function () {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "test",
      price: -10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "test",
    })
    .expect(400);
});

it("should create a ticket with valid input", async function () {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "test",
      price: 10,
    })
    .expect(200);
});
