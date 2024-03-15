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
exports.generateRandomToken = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "nikeshsapkota2021@gmail.com", // replace with your Gmail email
        pass: "fxtl sxvi ssmz hyvt", // replace with your Gmail password or app-specific password
    },
});
const sendVerificationEmail = (to, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: "nikeshsapkota2021@gmail.com",
        to,
        subject: "Email Verification",
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <h2 style="color: #333;">Thank You for Registering!</h2>
      <p style="color: #555;">Welcome to our Event Management System.</p>
      <p style="color: #555;">To verify your email, please click the following link:</p>
      <a href="http://localhost:3000/verify-email?token=${verificationToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p style="color: #555;">If you didn't register for our system, you can ignore this email.</p>
    </div>
  `,
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log("Verification email sent successfully.");
    }
    catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const generateRandomToken = () => {
    return crypto_1.default.randomBytes(32).toString("hex");
};
exports.generateRandomToken = generateRandomToken;
