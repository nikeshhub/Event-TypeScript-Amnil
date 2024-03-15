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
exports.connectDatabase = void 0;
const typeorm_1 = require("typeorm");
const event_1 = require("../models/event");
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.DB_PASSWORD);
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: "postgres",
            url: process.env.DB_URL,
            ssl: {
                rejectUnauthorized: false,
            },
            synchronize: true,
            entities: [event_1.Event, user_1.User],
            // type: "postgres",
            // host: "localhost",
            // port: 5432,
            // username: "postgres",
            // password: process.env.DB_PASSWORD,
            // database: "AmnilTS",
            // synchronize: true,
            // entities: [Event, User],
            // name: "default",
        });
        console.log("Connected to the database");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
});
exports.connectDatabase = connectDatabase;
