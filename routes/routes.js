import express from "express";
import {
  createProduct,
  deleteProduct,
  productList,
  updateProduct,
} from "../controllers/controller.js";

const app = express.Router();

app.post("/products", createProduct);
app.get("/products", productList);
app.delete("/products/:id", deleteProduct);
app.put("/products/:id", updateProduct);

export default app;
