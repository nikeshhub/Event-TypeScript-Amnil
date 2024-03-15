import express from "express";
import userRouter from "./routes/user";
import eventRouter from "./routes/event";
import "reflect-metadata";
import { connectDatabase } from "./utils/db";
import dotenv from "dotenv";
import { runCronJob } from "./utils/cronJob";

export const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
dotenv.config();
app.use(express.static("./public"));

//connecting to database
connectDatabase()
  .then(() => {
    app.use("/user", userRouter);
    app.use("/event", eventRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    runCronJob();
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
