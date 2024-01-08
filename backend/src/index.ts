import express,{Request,Response} from "express";
import {sampleProducts} from "./data.js";
import dotenv from 'dotenv';
import cors from 'cors';
import * as mongoose from "mongoose";
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

app.get('/api/products/:slug', (req: Request, res: Response) => {
    res.json(sampleProducts.find((x) => x.slug === req.params.slug))
})

app.use('/api/products',(req:Request,res:Response)=>{
    res.json(sampleProducts)
});


const PORT = 5050;
app.listen(5050,()=>{
    console.log(`server is listening at ${PORT}`)
});