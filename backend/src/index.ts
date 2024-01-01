import express,{Request,Response} from "express";
import {sampleProducts} from "./data.js";
import cors from 'cors';
const app = express();

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