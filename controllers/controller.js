import Product from "../model/model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";

// Create Product
const createProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    richDescription,
    image,
    brand,
    price,
    category,
    countInStock,
  } = req.body;

  // Validate input
  if (
    !name ||
    !description ||
    !richDescription ||
    !image ||
    !brand ||
    typeof price === "undefined" ||
    !category ||
    typeof countInStock === "undefined"
  ) {
    return next(new CustomError(400, "All fields are required"));
  }

  try {
    const product = new Product({
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
    });

    const createdProduct = await product.save(); // Save the product to the database

    res.status(201).json({
      success: true,
      data: createdProduct,
      message: "Product created successfully.",
    });
  } catch (err) {
    console.error("Error creating product:", err);
    return next(new CustomError(500, "Failed to create product"));
  }
});

// Product List
const productList = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  // Validate input
  if (!name) {
    return next(new CustomError(400, "Name is required"));
  }

  try {
    const products = await Product.find({ name }); // Find products by name

    if (products.length === 0) {
      return next(
        new CustomError(404, "Product with the specified name does not exist")
      );
    }

    res.status(200).json({
      success: true,
      data: products,
      message: "Products retrieved successfully.",
    });
  } catch (err) {
    console.error("Error retrieving products:", err.message);
    return next(new CustomError(500, "Failed to retrieve products"));
  }
});

export { createProduct, productList };
