import { Router } from "express";
import {
  createEvent,
  getEvent,
  getEvents,
  getTodayEvents,
} from "../controllers/event";
import upload from "../utils/upload";

const eventRouter = Router();

eventRouter
  .route("/")
  .post(upload.single("thumbnail"), createEvent)
  .get(getEvents);

eventRouter.route("/today").get(getTodayEvents);
eventRouter.route("/:id").get(getEvent);

export default eventRouter;
