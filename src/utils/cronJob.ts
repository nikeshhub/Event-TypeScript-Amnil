import nodemailer from "nodemailer";
import cron from "node-cron";
import logger from "./logger";
import { getRepository } from "typeorm";
import { startOfDay } from "date-fns";
import { Event } from "../models/event";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const cron_schedule = process.env.CRON_SCHEDULE || "0 9 * * *";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikeshsapkota2021@gmail.com",
    pass: "fxtl sxvi ssmz hyvt",
  },
});

const sendEventEmail = async (events: Event[]): Promise<void> => {
  const templatePath = path.join(__dirname, "views", "eventEmailTemplate.ejs");
  console.log("Template path:", templatePath);
  const template = fs.readFileSync(templatePath, "utf-8");
  const html = ejs.render(template, { events: events });

  const mailOptions = {
    from: "nikeshsapkota2021@gmail.com",
    to: "nikeshscript@gmail.com",
    subject: "Today's events",
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.log("info", "Event mail sent successfully.");
  } catch (error) {
    logger.log("error", "Error sending event email:", error);
    throw error;
  }
};

export const runCronJob = (): void => {
  cron.schedule(cron_schedule, async () => {
    try {
      const eventRepository = getRepository(Event);
      const todayDate = startOfDay(new Date());
      console.log(todayDate);
      const todaysEvents = await eventRepository.find({
        where: {
          date: todayDate,
        },
      });

      await sendEventEmail(todaysEvents);
    } catch (error) {
      logger.log("error", "Error occurred while sending event email:", error);
    }
  });
};
