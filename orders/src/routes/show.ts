import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  validateRequest,
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@joker7nbt-ticketing/common";
import { Order } from "../models/order";
import { param } from "express-validator";

const router = express.Router();

router.get(
  "/api/orders/:id",
  requireAuth,
  [
    param("id").custom((input: string) =>
      mongoose.Types.ObjectId.isValid(input)
    ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate("ticket");
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(order);
  }
);

export { router as showRouter };
