// index.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { database } from "./database/database.js";
import { PORT } from "./config/config.js";
import productRoutes from "./routes/routes.js";
import categoryRoutes from "./routes/category.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { ErrorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // CORS should generally come first
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// Register routes with consistent API version prefix
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);

// Error handling middleware should come last
app.use(ErrorHandler);

// Test route
app.get("/", (req, res) => {
  res.send("Hello Backend");
});

// Server setup
const startServer = async () => {
  try {
    await database();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect with the database:", error.message); // Log error details
  }
};

startServer();
