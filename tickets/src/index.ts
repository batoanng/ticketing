import mongoose from "mongoose";
import { app } from "./app";

require("dotenv").config();

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT is required!");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI is required!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to mongodb...");
  } catch (error) {
    console.error(error);
  }
};

start();

app.listen(3000, () => {
  console.log(`Listening on port 3000!!!`);
});
