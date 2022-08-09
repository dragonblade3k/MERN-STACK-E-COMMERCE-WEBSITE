import express from "express";
import { getProduct, getProducts, getReview } from "../controller/product.js";

const router = express.Router()
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/review/:id", getReview);


export default router;