import express, { Request, Response } from "express";
import { validateRequest, requireAuth } from "@joker7nbt-ticketing/common";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    res.status(200).send();
  }
);

export { router as newRouter };
