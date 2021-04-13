import express, { Request, Response } from "express";
import {
  validateRequest,
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@joker7nbt-ticketing/common";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";
import { natsWrapper } from "../nats-wrapper";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required!"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    if (req.currentUser!.id !== ticket.userId) {
      throw new NotAuthorizedError();
    }
    ticket.title = title;
    ticket.price = price;
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title,
      price,
      userId: ticket.userId,
    });
    res.send(ticket);
  }
);

export { router as updateRouter };
