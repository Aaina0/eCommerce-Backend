import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors"; // Importing cors
import { database } from "./database/database.js";
import { PORT } from "./config/config.js";
import productRoutes from "./routes/routes.js"; // Ensure this path is correct
import categoryRoutes from "./routes/category.routes.js";
import { ErrorHandler } from "./middleware/errorHandler.js";

const app = express();

dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

// Register product routes with the /api/v1 prefix
app.use("/api/v1", productRoutes);
app.use("/api/v2", categoryRoutes);
app.use(ErrorHandler);

// Test route
app.get("/", (req, res) => {
  res.send("Hello Backend");
});

// Server setup
const Server = async () => {
  try {
    await database();
    app.listen(PORT, () => {
      console.log(`Server is Running on ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to connect with database");
  }
};

Server();
