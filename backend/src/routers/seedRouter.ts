import express,{Request,Response} from "express";
import asyncHandler from "express-async-handler";
import {ProductModel} from "../models/productModel.js";
import {sampleProducts} from "../data.js";

export const seedRouter = express.Router()

seedRouter.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        await ProductModel.deleteMany({})
        const createdProducts = await ProductModel.insertMany(sampleProducts)
        res.json({createdProducts})
    })
)
