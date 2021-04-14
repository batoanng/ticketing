import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@joker7nbt-ticketing/common";
import { deleteRouter } from "./routes/delete";
import { newRouter } from "./routes/new";
import { showRouter } from "./routes/show";
import { indexRouter } from "./routes";

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
app.use(deleteRouter);
app.use(newRouter);
app.use(showRouter);
app.use(indexRouter);

//handle invalid routes
app.get("*", async () => {
  throw new NotFoundError();
});
//end routers

app.use(errorHandler);

export { app };
