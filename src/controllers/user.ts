import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import dotenv from "dotenv";
import { sendVerificationEmail } from "../utils/verifyEmail";

dotenv.config();

const secretKey = process.env.SECRET_KEY || "Amnil";

export const registerUser = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.verifyEmail = false;

    const result = await User.create(data).save();

    const infoObj = {
      _id: result.id,
    };

    const expiryInfo = {
      expiresIn: "2d",
    };
    const verificationToken = jwt.sign(infoObj, secretKey, expiryInfo);

    await sendVerificationEmail(data.email, verificationToken);

    res.status(201).json({
      success: true,
      message:
        "Verification email has been sent to your email. Please verify your email to continue.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userRepository = getRepository(User);
    const bearerToken = req.headers.authorization;
    console.log(bearerToken);
    if (!bearerToken) throw new Error("Token not found");
    const token = bearerToken.split(" ")[1];

    const infoObj: any = jwt.verify(token, secretKey);
    console.log(infoObj);

    const userId = infoObj._id;
    console.log(userId);

    const user = await userRepository.findOne({ where: { id: userId } });
    console.log(user);

    if (!user) throw new Error("User not found");

    user.verifyEmail = true;
    console.log(user);
    const result = await userRepository.save(user);
    res.json({
      success: true,
      message: "Email verified successfully",
      data: result,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email: email } });

    if (user) {
      if (user.verifyEmail) {
        const isPasswordValidated: boolean = await bcrypt.compare(
          password,
          user.password
        );
        if (isPasswordValidated) {
          const infoObj = {
            _id: user.id,
          };

          const expiryInfo = {
            expiresIn: "365d",
          };
          const verificationToken = jwt.sign(infoObj, secretKey, expiryInfo);
          res.status(201).json({
            success: true,
            message: "Login successful",
            data: user,
            token: verificationToken,
          });
        } else {
          throw new Error("Password is wrong");
        }
      } else {
        throw new Error("Email is not verified");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error: any) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
