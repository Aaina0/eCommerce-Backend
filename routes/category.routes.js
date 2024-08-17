import express from "express";
import {
  createCategory,
  deleteCategory,
  findCategory,
  updateCategory,
} from "../controllers/category.controllers.js";

const app = express.Router();

app.post("/category", createCategory);
app.get("/category/:id", findCategory);
app.delete("/category/:id", deleteCategory);
app.put("/category/:id", updateCategory);

export default app;
