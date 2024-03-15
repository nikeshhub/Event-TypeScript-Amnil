"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const event_1 = __importDefault(require("./routes/event"));
require("reflect-metadata");
const db_1 = require("./utils/db");
const dotenv_1 = __importDefault(require("dotenv"));
const cronJob_1 = require("./utils/cronJob");
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
exports.app.use(express_1.default.json());
dotenv_1.default.config();
exports.app.use(express_1.default.static("./public"));
//connecting to database
(0, db_1.connectDatabase)()
    .then(() => {
    exports.app.use("/user", user_1.default);
    exports.app.use("/event", event_1.default);
    exports.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    (0, cronJob_1.runCronJob)();
})
    .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});
