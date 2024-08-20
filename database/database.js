import mongoose from "mongoose";
import { mongoUri } from "../config/config.js";

export const database = async () => {
  try {
    const cleanedUri = mongoUri.replace(/"/g, "").trim();
    console.log("Mongo URI:", cleanedUri); // Log the cleaned URI

    await mongoose.connect(cleanedUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
  }
};
