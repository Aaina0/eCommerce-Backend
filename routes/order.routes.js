// order.routes.js
import express from "express";

import { createOrder, findOrder } from "../controllers/order.controller.js";

const app = express.Router();

app.post("/", createOrder);
app.get("/:id", findOrder);

export default app;
