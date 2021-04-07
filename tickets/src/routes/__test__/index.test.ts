import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "test",
    price: 12,
  });
};

it("should return tickets when do a get request", async function () {
  await createTicket();
  await createTicket();
  await createTicket();

  const res = await request(app)
    .get("/api/tickets")
    .set("Cookie", global.signin())
    .send({})
    .expect(200);
  expect(res.body.length).toEqual(3);
});
