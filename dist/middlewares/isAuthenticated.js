"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY || "Amnil";
const isAuthenticated = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken)
            throw new Error("Token not found");
        const token = bearerToken.split(" ")[1];
        const infoObj = jsonwebtoken_1.default.verify(token, secretKey);
        req.userId = infoObj._id;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
exports.default = isAuthenticated;
