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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const typeorm_1 = require("typeorm");
const isAuthorized = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let UserId = req.userId;
            const userRepository = (0, typeorm_1.getRepository)(user_1.User);
            const user = yield userRepository.findOne({ where: { id: UserId } });
            //   let user = await User.findById(UserId);
            if (!user) {
                throw new Error("User not found");
            }
            let userRole = user.role;
            if (roles === userRole) {
                next();
            }
            else {
                res.status(401).json({
                    status: false,
                    message: `Not Authorized`,
                });
            }
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    });
};
exports.default = isAuthorized;
