import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { getRepository } from "typeorm";

interface AuthorizedRequest extends Request {
  userId?: number;
}

const isAuthorized = (roles: string) => {
  return async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      let UserId = req.userId;
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { id: UserId } });
      //   let user = await User.findById(UserId);
      if (!user) {
        throw new Error("User not found");
      }
      let userRole = user.role;
      if (roles === userRole) {
        next();
      } else {
        res.status(401).json({
          status: false,
          message: `Not Authorized`,
        });
      }
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export default isAuthorized;
