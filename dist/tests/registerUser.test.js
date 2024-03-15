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
const user_2 = require("../controllers/user");
describe("registerUser", () => {
    it("should register a new user ", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                fullName: "Test User",
                email: "nikeshsapkota2021@gmail.com",
                password: "password",
                address: "Jorpati",
                phoneNumber: "9815988535",
                dateOfBirth: new Date(),
                role: "user",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        user_1.User.create = jest.fn().mockReturnValueOnce({
            save: jest.fn().mockResolvedValueOnce({ id: 1 }),
        });
        yield (0, user_2.registerUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: expect.any(String),
            data: expect.objectContaining({ id: 1 }),
        });
    }));
});
