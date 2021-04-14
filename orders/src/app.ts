import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@joker7nbt-ticketing/common";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    //ignore http, just care for https
    // secure: true
  })
);
app.use(currentUser);

//routers

//handle invalid routes
app.get("*", async () => {
  throw new NotFoundError();
});
//end routers

app.use(errorHandler);

export { app };
