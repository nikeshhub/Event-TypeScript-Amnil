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
exports.loginUser = exports.verifyUser = exports.registerUser = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
const verifyEmail_1 = require("../utils/verifyEmail");
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY || "Amnil";
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        data.password = hashedPassword;
        data.verifyEmail = false;
        const result = yield user_1.User.create(data).save();
        const infoObj = {
            _id: result.id,
        };
        const expiryInfo = {
            expiresIn: "2d",
        };
        const verificationToken = jsonwebtoken_1.default.sign(infoObj, secretKey, expiryInfo);
        yield (0, verifyEmail_1.sendVerificationEmail)(data.email, verificationToken);
        res.status(201).json({
            success: true,
            message: "Verification email has been sent to your email. Please verify your email to continue.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.registerUser = registerUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(user_1.User);
        const bearerToken = req.headers.authorization;
        console.log(bearerToken);
        if (!bearerToken)
            throw new Error("Token not found");
        const token = bearerToken.split(" ")[1];
        const infoObj = jsonwebtoken_1.default.verify(token, secretKey);
        console.log(infoObj);
        const userId = infoObj._id;
        console.log(userId);
        const user = yield userRepository.findOne({ where: { id: userId } });
        console.log(user);
        if (!user)
            throw new Error("User not found");
        user.verifyEmail = true;
        console.log(user);
        const result = yield userRepository.save(user);
        res.json({
            success: true,
            message: "Email verified successfully",
            data: result,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
});
exports.verifyUser = verifyUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userRepository = (0, typeorm_1.getRepository)(user_1.User);
        const user = yield userRepository.findOne({ where: { email: email } });
        if (user) {
            if (user.verifyEmail) {
                const isPasswordValidated = yield bcrypt_1.default.compare(password, user.password);
                if (isPasswordValidated) {
                    const infoObj = {
                        _id: user.id,
                    };
                    const expiryInfo = {
                        expiresIn: "365d",
                    };
                    const verificationToken = jsonwebtoken_1.default.sign(infoObj, secretKey, expiryInfo);
                    res.status(201).json({
                        success: true,
                        message: "Login successful",
                        data: user,
                        token: verificationToken,
                    });
                }
                else {
                    throw new Error("Password is wrong");
                }
            }
            else {
                throw new Error("Email is not verified");
            }
        }
        else {
            throw new Error("User not found");
        }
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
});
exports.loginUser = loginUser;
