import { config } from "dotenv";

config();

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000; // Default to port 5000 if PORT is not set in .env
const apiUrl = process.env.API_URL;

if (!mongoUri || !apiUrl) {
  throw new Error("Missing necessary environment variables");
}

export { mongoUri, PORT, apiUrl };
