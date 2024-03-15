import { createConnection } from "typeorm";
import { Event } from "../models/event";
import { User } from "../models/user";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_PASSWORD);

export const connectDatabase = async () => {
  try {
    await createConnection({
      type: "postgres",
      url: process.env.DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      entities: [Event, User],

      // type: "postgres",
      // host: "localhost",
      // port: 5432,
      // username: "postgres",
      // password: process.env.DB_PASSWORD,
      // database: "AmnilTS",
      // synchronize: true,
      // entities: [Event, User],
      // name: "default",
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
