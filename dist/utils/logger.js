"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: "success.log",
            level: "info",
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.simple(), winston_1.format.prettyPrint()),
        }),
        new winston_1.transports.File({
            filename: "error.log",
            level: "error",
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.simple(), winston_1.format.prettyPrint()),
        }),
    ],
});
exports.default = logger;
