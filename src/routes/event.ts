import { Router } from "express";
import {
  createEvent,
  getEvent,
  getEvents,
  getTodayEvents,
} from "../controllers/event";
import upload from "../utils/upload";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAuthorized from "../middlewares/isAuthorized";

const eventRouter = Router();

eventRouter
  .route("/")
  .post(
    upload.single("thumbnail"),
    isAuthenticated,
    isAuthorized("admin"),
    createEvent
  )
  .get(getEvents);

eventRouter.route("/today").get(getTodayEvents);
eventRouter.route("/:id").get(getEvent);

export default eventRouter;
