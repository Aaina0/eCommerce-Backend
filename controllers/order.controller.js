// order.controller.js
import Order from "../model/order.js";
import OrderItem from "../model/order.item.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
//import sendToken from "../utils/sendToken.js";

const createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems: orderItemsData,
    shippingAddress1,
    shippingAddress2,
    city,
    country,
    status = "Pending",
    totalPrice,
    user,
    dateOrdered,
  } = req.body;

  if (
    !orderItemsData ||
    !shippingAddress1 ||
    !city ||
    !country ||
    !totalPrice ||
    !user
  ) {
    return next(new CustomError(400, "All required fields must be provided"));
  }

  const orderItems = await Promise.all(
    orderItemsData.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );

  const order = await Order.create({
    orderItems,
    shippingAddress1,
    shippingAddress2,
    city,
    country,
    status,
    totalPrice,
    user,
    dateOrdered,
  });

  res.status(201).json({
    success: true,
    message: "Order Created Successfully",
    order: order,
  });
});

const findOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });

  if (!order) {
    return next(new CustomError(404, "Order not found"));
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

export { createOrder, findOrder };
