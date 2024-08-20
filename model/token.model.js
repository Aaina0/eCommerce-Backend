import mongoose, { Schema, Types, model } from "mongoose";

const tokenSchema = new Schema(
  {
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = model("Token", tokenSchema);

export default Token;
