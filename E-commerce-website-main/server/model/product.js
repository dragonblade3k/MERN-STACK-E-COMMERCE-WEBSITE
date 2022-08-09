
import Mongoose from 'mongoose'

const ReviewSchema = Mongoose.Schema({
  review: String,
  star: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  user: String,
});

const ProductSchema = Mongoose.Schema({
  Image: String,
  Title: String,
  Quantity: Number,
  Owner: String,
  Price: Number,
  Tags: [String],
  Stars: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  Review: [ReviewSchema],
});

const Product = Mongoose.model('Products',ProductSchema)
export default Product;