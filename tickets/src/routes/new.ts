import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, requireAuth } from "@joker7nbt-ticketing/common";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";

const router = express.Router();

router.post(
  "/api/tickets",
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
    const userId = req.currentUser!.id;
    const ticket = Ticket.build({
      title,
      price,
      userId,
    });
    await ticket.save();
    await new TicketCreatedPublisher(client).publish({
      id: ticket.id,
      title,
      price,
      userId,
    });
    res.status(201).send(ticket);
  }
);

export { router as newRouter };
