import express from "express";
import {
  createProduct,
  productList,
  deleteProduct,
  updateProduct,
} from "../controllers/controller.js";

const app = express.Router();

// Define routes without the file upload middleware
app.post("/", createProduct); // No file upload middleware here
app.get("/", productList);
app.delete("/:id", deleteProduct);
app.put("/:id", updateProduct);

export default app;
