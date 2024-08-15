import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import Category from "../model/category.js";

const createCategory = asyncHandler(async (req, res, next) => {
  const { name, color, icon } = req.body;

  // Validate input
  if (!name || !color || !icon) {
    return next(new CustomError(400, "All fields are required"));
  }

  try {
    const category = new Category({
      name,
      color,
      icon,
    });

    const createdCategory = await category.save();

    res.status(201).json({
      success: true,
      category: createdCategory,
    });
  } catch (error) {
    return next(new CustomError(500, "Category cannot be created"));
  }
});

export { createCategory };
