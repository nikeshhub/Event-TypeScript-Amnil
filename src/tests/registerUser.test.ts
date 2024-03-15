import { Request, Response } from "express";
import { User } from "../models/user";
import { registerUser } from "../controllers/user";
describe("registerUser", () => {
  it("should register a new user ", async () => {
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
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    User.create = jest.fn().mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce({ id: 1 }),
    });

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: expect.any(String),
      data: expect.objectContaining({ id: 1 }),
    });
  });
});
