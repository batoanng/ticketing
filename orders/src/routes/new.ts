import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, requireAuth } from "@joker7nbt-ticketing/common";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/orders",
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

export { router as newRouter };
