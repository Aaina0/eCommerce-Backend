import Product from "../model/model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";

const createProduct = asyncHandler(async (req, res, next) => {
  const { name, image, countInStock } = req.body;

  // Validate input
  if (!name || !image || countInStock === undefined) {
    return next(new CustomError(400, "All fields are required"));
  }

  try {
    const product = new Product({
      name,
      image,
      countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      product: createdProduct,
    });
  } catch (err) {
    console.error(err);
    return next(new CustomError(500, "Failed to create product"));
  }
});

const productList = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new CustomError(400, "Name is required"));
  }

  const products = await Product.findOne({ name });

  if (!products) {
    return next(
      new CustomError(404, "Product with the specified name does not exist")
    );
  }

  res.status(200).json({
    success: true,
    products,
  });
});

export { createProduct, productList };
