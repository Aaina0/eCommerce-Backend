import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

const OrderItem = model("OrderItem", orderItemSchema);

export default OrderItem;
