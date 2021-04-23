import { Ticket } from "../ticket";

it("should implement optimistic concurency control", async (done) => {
  const ticket = Ticket.build({
    title: "test",
    price: 10,
    userId: "123",
  });
  await ticket.save();
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  firstInstance!.price = 20;
  secondInstance!.price = 30;
  await firstInstance!.save();
  try {
    await secondInstance!.save();
  } catch (e) {
    return done();
  }
  throw new Error("should not reach this point");
});

it("should increase the version number on multiple save", async () => {
  const ticket = Ticket.build({
    title: "test",
    price: 10,
    userId: "123",
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
});
