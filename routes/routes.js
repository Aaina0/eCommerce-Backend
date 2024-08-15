import express from "express";
import { createProduct, productList } from "../controllers/controller.js";

const app = express.Router();

app.post("/products", createProduct);
app.get("/products", productList);

export default app;
