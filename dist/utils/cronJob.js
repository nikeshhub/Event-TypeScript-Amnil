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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCronJob = exports.sendEventEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const node_cron_1 = __importDefault(require("node-cron"));
const logger_1 = __importDefault(require("./logger"));
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const event_1 = require("../models/event");
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
dotenv_1.default.config();
const cron_schedule = process.env.CRON_SCHEDULE || "0 9 * * *";
console.log(cron_schedule);
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "nikeshsapkota2021@gmail.com",
        pass: "fxtl sxvi ssmz hyvt",
    },
});
const sendEventEmail = (events) => __awaiter(void 0, void 0, void 0, function* () {
    const templatePath = path_1.default.join(__dirname, "views", "eventEmailTemplate.ejs");
    console.log("Template path:", templatePath);
    const template = fs_1.default.readFileSync(templatePath, "utf-8");
    const html = ejs_1.default.render(template, { events: events });
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    const adminUsers = yield userRepository.find({ where: { role: "admin" } });
    const adminEmails = adminUsers.map((user) => user.email);
    const mailOptions = {
        from: "nikeshsapkota2021@gmail.com",
        to: adminEmails.join(", "),
        subject: "Today's events",
        html: html,
    };
    try {
        yield transporter.sendMail(mailOptions);
        logger_1.default.log("info", "Event mail sent successfully.");
    }
    catch (error) {
        logger_1.default.log("error", "Error sending event email:", error);
        throw error;
    }
});
exports.sendEventEmail = sendEventEmail;
const runCronJob = () => {
    node_cron_1.default.schedule(cron_schedule, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eventRepository = (0, typeorm_1.getRepository)(event_1.Event);
            const todayDate = (0, date_fns_1.startOfDay)(new Date());
            console.log(todayDate);
            const todaysEvents = yield eventRepository.find({
                where: {
                    date: todayDate,
                },
            });
            yield (0, exports.sendEventEmail)(todaysEvents);
        }
        catch (error) {
            logger_1.default.log("error", "Error occurred while sending event email:", error);
        }
    }));
};
exports.runCronJob = runCronJob;
