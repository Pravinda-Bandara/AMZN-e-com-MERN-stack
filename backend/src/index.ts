import express,{Request,Response} from "express";
import {sampleProducts} from "./data.js";
const app = express();

app.use('/api/products',(req:Request,res:Response)=>{
    res.json(sampleProducts)
});

app.listen(5050,()=>{
    console.log("server is listening at 5050")
});