import express from "express";
import { createCategory } from "../controllers/category.controllers.js";

const app = express.Router();

app.post("/category", createCategory);
//app.get("/products", productList);

export default app;
