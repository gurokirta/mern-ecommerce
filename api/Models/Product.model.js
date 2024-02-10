import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  measurements: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  pictures: {
    type: Array,
    required: true,
  },
  color: {
    type: Array,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  reviews: [
    {
      value: { type: String },
      like: { type: Number, default: 0 },
      replies: [{ type: String }],
    },
  ],
  userRef: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
