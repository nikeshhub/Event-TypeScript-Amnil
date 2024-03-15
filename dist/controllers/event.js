"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayEvents = exports.getEvent = exports.getEvents = exports.createEvent = void 0;
const typeorm_1 = require("typeorm");
const event_1 = require("../models/event");
const date_fns_1 = require("date-fns");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const eventData = req.body;
        const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        console.log(file);
        eventData.thumbnail = file;
        const eventRepository = (0, typeorm_1.getRepository)(event_1.Event);
        const newEvent = eventRepository.create(eventData);
        const savedEvent = yield eventRepository.save(newEvent);
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: savedEvent,
        });
    }
    catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
});
exports.createEvent = createEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventRepository = (0, typeorm_1.getRepository)(event_1.Event);
        const events = yield eventRepository.find();
        res.json({
            success: true,
            message: "Events fetched successfully",
            data: events,
        });
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
});
exports.getEvents = getEvents;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const eventRepository = (0, typeorm_1.getRepository)(event_1.Event);
        const event = yield eventRepository.findOne({ where: { id } });
        res.json({
            success: true,
            message: "Event fetched successfully",
            data: event,
        });
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
});
exports.getEvent = getEvent;
const getTodayEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventRepository = (0, typeorm_1.getRepository)(event_1.Event);
        const todayDate = (0, date_fns_1.startOfDay)(new Date());
        console.log(todayDate);
        const events = yield eventRepository.find({
            where: {
                date: todayDate,
            },
        });
        res.json({
            success: true,
            message: "Events fetched successfully",
            data: events,
        });
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
});
exports.getTodayEvents = getTodayEvents;
