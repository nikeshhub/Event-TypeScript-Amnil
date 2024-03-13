import { Router } from "express";
import { loginUser, registerUser, verifyUser } from "../controllers/user";

const userRouter = Router();

userRouter.route("/").post(registerUser);
userRouter.route("/verify-email").post(verifyUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
