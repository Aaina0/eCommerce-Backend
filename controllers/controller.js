import Product from "../model/model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
// Remove multer import

// Create Product with single image
const createProduct = asyncHandler(async (req, res, next) => {
  // Manually parse the file from req.body or req.files if you use another library
  // For demonstration, we'll assume the file is uploaded in a different way

  // Log the file to check if it's being received
  console.log("File:", req.file); // This will be removed as we're not using Multer

  const {
    name,
    description,
    richDescription,
    brand,
    price,
    category,
    countInStock,
    rating = 0,
    numReviews = 0,
    isFeatured = false,
  } = req.body;

  // Manually handle the file upload and path if you’re using another approach
  // For example, using a different middleware or library to parse multipart data

  const singleImageFile = req.file; // This will be removed or adapted to your new method

  // Manually set the imagePath or handle it based on your new file handling approach
  const imagePath = singleImageFile
    ? `${req.protocol}://${req.get("host")}/public/uploads/${
        singleImageFile.filename
      }`
    : null;

  try {
    const product = new Product({
      name,
      description,
      richDescription,
      image: imagePath, // Use image URL
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    });

    const createdProduct = await product.save();

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
  const { name } = req.query; // Changed to req.query to be consistent with GET requests

  if (!name) {
    return next(new CustomError(400, "Name is required"));
  }

  try {
    const products = await Product.find({ name });

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

// Delete Product
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return next(new CustomError(404, "Product not found."));
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return next(new CustomError(500, "Failed to delete product."));
  }
});

// Update Product
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (!updates.name && !updates.description && !updates.price) {
    return res.status(400).json({
      success: false,
      message:
        "At least one field (name, description, or price) must be provided for update.",
    });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!product) {
      return next(
        new CustomError(404, "The product with the given ID was not found.")
      );
    }

    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully.",
    });
  } catch (error) {
    return next(new CustomError(500, "Failed to update product."));
  }
});

export { createProduct, productList, deleteProduct, updateProduct };
