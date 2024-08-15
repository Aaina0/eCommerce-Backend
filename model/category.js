import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
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

const Category = mongoose.model("Category", categorySchema);
export default Category;
