import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
},{timestamps: true});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
