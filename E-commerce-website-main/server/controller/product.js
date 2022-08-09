import Mongoose from 'mongoose';
import Product from '../model/product.js'

export const getProducts = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(data);
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json(`No post with id ${id}`);
    }
    const data = await Product.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getReview = async (req, res) => {
  const { id } = req.params;
  const Review = req.body;
  try {
    const data = await Product.findById(id);
    const stars =
      (data.Stars * data.Review.length + Review.star) /
      (data.Review.length + 1);
    data.Stars = stars;
    data.Review.push(Review);
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};