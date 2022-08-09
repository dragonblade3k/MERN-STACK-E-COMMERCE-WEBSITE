import dotenv from "dotenv";
import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import UserRout from "./routes/user.js";

import Mongoose from 'mongoose';
import ProductRout from './routes/product.js'
import PaymentRout from './routes/payment.js'
import cors from 'cors';
const app = express()
app.use(cors())
dotenv.config()
app.use(json({ limit: "10mb" }));

app.use(urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


app.use('/Product',ProductRout)
app.use("/User", UserRout);
app.use("/Checkout",PaymentRout)
const PORT = process.env.PORT || 4000;
Mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})})
.catch((error)=>console.log(error));

Mongoose.set("useFindAndModify",false)
