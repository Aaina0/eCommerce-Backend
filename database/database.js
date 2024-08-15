import mongoose from "mongoose";
import { mongoUri } from "../config/config.js";

export const database = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
