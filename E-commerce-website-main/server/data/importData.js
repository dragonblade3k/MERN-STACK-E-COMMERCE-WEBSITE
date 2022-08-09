import Product from '../model/product.js'
import Mongoose from 'mongoose'
import {data} from './data.js'
import dotenv from "dotenv";


const insertData = async()=> {
    try {
        dotenv.config()
        Mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(async()=>{
            await Product.deleteMany({});
            console.log(`Database connected`)
            await Product.insertMany(data);
            console.log('Data inserted successfully');
            process.exit()
        })
        .catch((error)=>console.log(error));
    } catch (error) {
        console.log(error)
    }
};
insertData();
