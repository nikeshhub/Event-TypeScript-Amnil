import { getRepository } from "typeorm";
import { Event } from "../models/event";
import { Request, Response } from "express";
import { startOfDay } from "date-fns";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventData = req.body;
    const file = req.file?.filename;
    console.log(file);
    eventData.thumbnail = file;

    const eventRepository = getRepository(Event);
    const newEvent = eventRepository.create(eventData);
    const savedEvent = await eventRepository.save(newEvent);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: savedEvent,
    });
  } catch (error: any) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventRepository = getRepository(Event);
    const events = await eventRepository.find();
    res.json({
      success: true,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOne({ where: { id } });
    res.json({
      success: true,
      message: "Event fetched successfully",
      data: event,
    });
  } catch (error: any) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getTodayEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const eventRepository = getRepository(Event);
    const todayDate = startOfDay(new Date());
    console.log(todayDate);
    const events = await eventRepository.find({
      where: {
        date: todayDate,
      },
    });
    res.json({
      success: true,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
