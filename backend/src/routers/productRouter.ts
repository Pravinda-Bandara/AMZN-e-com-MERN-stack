import express from "express";
import asyncHandler from 'express-async-handler'
import {ProductModel} from "../models/productModel.js";
import {isAuth} from "../utils.js";

export const productRouter = express.Router()
// /api/products
productRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await ProductModel.find()
        res.json(products)
    })
)

// /api/slug/tshirt
productRouter.get(
    '/slug/:slug',
    asyncHandler(async (req, res) => {
        const products = await ProductModel.findOne({slug:req.params.slug})
        if(products){
            res.json(products)
        }else {
            res.status(404).json({message:'Product Not Found'})
        }
    })
)


