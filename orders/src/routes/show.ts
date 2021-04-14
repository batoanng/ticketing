import express, { Request, Response } from "express";
import {
  validateRequest,
  requireAuth,
  NotFoundError,
} from "@joker7nbt-ticketing/common";

const router = express.Router();

router.get(
  "/api/orders/:id",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    // const ticket = await Ticket.findById(req.params.id);
    // if (!ticket) {
    //   throw new NotFoundError();
    // }
    // res.send(ticket);
  }
);

export { router as showRouter };
