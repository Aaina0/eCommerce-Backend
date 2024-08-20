import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

// Virtual field to get the `id` from `_id`
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Set virtual fields to be included in JSON output
orderSchema.set("toJSON", {
  virtuals: true,
});

// Export the Order model
const Order = model("Order", orderSchema);

export default Order;
