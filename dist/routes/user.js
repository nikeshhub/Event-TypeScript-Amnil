"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter.route("/").post(user_1.registerUser);
userRouter.route("/verify-email").post(user_1.verifyUser);
userRouter.route("/login").post(user_1.loginUser);
exports.default = userRouter;
