import express,{Request,Response} from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import * as mongoose from "mongoose";
import {productRouter} from "./routers/productRouter.js";
const app = express();

dotenv.config()

dotenv.config()

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazona'
mongoose.set('strictQuery', true)
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(() => {
        console.log('error mongodb')
    })

app.use(
    cors({
        credentials:true,
        origin:['http://localhost:5173']
    })
)

app.use('/api/products', productRouter)

const PORT = 5050;
app.listen(5050,()=>{
    console.log(`server is listening at ${PORT}`)
});