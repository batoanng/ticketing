import express, { Request, Response } from "express";
import {
  validateRequest,
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@joker7nbt-ticketing/common";
import { body } from "express-validator";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required!"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {}
);

export { router as deleteRouter };
