import express from "express";
import {
  admin,
  createUser,
  findUser,
  user,
} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/authorization.js";

const app = express.Router();

// Define POST route for user creation
app.post("/", createUser);
app.post("/login", findUser);
app.get("/api/user", isAuthenticated, user);
app.get("/api/admin", isAuthenticated, isAdmin, admin);

export default app;
