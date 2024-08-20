import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
    },
    icon: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Category = model("Category", categorySchema);

export default Category;
