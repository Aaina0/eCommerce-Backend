import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import Category from "../model/category.js";

// Create Category
const createCategory = asyncHandler(async (req, res, next) => {
  const { name, color, icon } = req.body;

  // Validate input
  if (!name || !color || !icon) {
    return next(new CustomError(400, "All fields are required"));
  }

  try {
    const category = new Category({ name, color, icon });
    const createdCategory = await category.save();

    res.status(201).json({
      success: true,
      data: createdCategory,
      message: "Category created successfully.",
    });
  } catch (error) {
    return next(new CustomError(500, "Category could not be created."));
  }
});

// Find Category
const findCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return next(
        new CustomError(404, "The category with the given ID was not found.")
      );
    }

    res.status(200).json({
      success: true,
      data: category,
      message: "Category retrieved successfully.",
    });
  } catch (error) {
    return next(new CustomError(500, "Failed to retrieve category."));
  }
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return next(new CustomError(404, "Category not found."));
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    return next(new CustomError(500, "Failed to delete category."));
  }
});

// Update Category
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  // Validate input
  if (!updates.name && !updates.color && !updates.icon) {
    return res.status(400).json({
      success: false,
      message:
        "At least one field (name, color, or icon) must be provided for update.",
    });
  }

  try {
    const category = await Category.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!category) {
      return next(
        new CustomError(404, "The category with the given ID was not found.")
      );
    }

    res.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully.",
    });
  } catch (error) {
    return next(new CustomError(500, "Failed to update category."));
  }
});

export { createCategory, deleteCategory, findCategory, updateCategory };
