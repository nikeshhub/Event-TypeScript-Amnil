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
import { User } from "../models/user";

dotenv.config();

const cron_schedule = process.env.CRON_SCHEDULE || "0 9 * * *";
console.log(cron_schedule);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikeshsapkota2021@gmail.com",
    pass: "fxtl sxvi ssmz hyvt",
  },
});

export const sendEventEmail = async (events: Event[]): Promise<void> => {
  const templatePath = path.join(__dirname, "views", "eventEmailTemplate.ejs");
  console.log("Template path:", templatePath);
  const template = fs.readFileSync(templatePath, "utf-8");
  const html = ejs.render(template, { events: events });

  const userRepository = getRepository(User);
  const adminUsers = await userRepository.find({ where: { role: "admin" } });
  const adminEmails = adminUsers.map((user) => user.email);

  const mailOptions = {
    from: "nikeshsapkota2021@gmail.com",
    to: adminEmails.join(", "),
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
