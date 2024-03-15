"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_1 = require("../controllers/event");
const upload_1 = __importDefault(require("../utils/upload"));
const isAuthenticated_1 = __importDefault(require("../middlewares/isAuthenticated"));
const isAuthorized_1 = __importDefault(require("../middlewares/isAuthorized"));
const eventRouter = (0, express_1.Router)();
eventRouter
    .route("/")
    .post(upload_1.default.single("thumbnail"), isAuthenticated_1.default, (0, isAuthorized_1.default)("admin"), event_1.createEvent)
    .get(event_1.getEvents);
eventRouter.route("/today").get(event_1.getTodayEvents);
eventRouter.route("/:id").get(event_1.getEvent);
exports.default = eventRouter;
