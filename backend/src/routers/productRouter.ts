import express,{Request,Response} from "express";
import asyncHandler from 'express-async-handler'
import {Product, ProductModel} from "../models/productModel.js";
import {isAdmin, isAuth} from "../utils.js";

const PAGE_SIZE = 3
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


productRouter.get(
    '/admin',
    isAuth,
    isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        const { query } = req
        const page = Number(query.page || 1)
        const pageSize = Number(query.pageSize) || PAGE_SIZE

        const products = await ProductModel.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize)
        const countProducts = await ProductModel.countDocuments()
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / PAGE_SIZE),
        })
    })
)

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        const product = await ProductModel.create({
            name: 'sample name ' + Date.now(),
            image: '../assets/images/p1.jpg',
            price: 0,
            slug: 'sample-slug-' + Date.now(),
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'sample description',
        } as Product)

        const createdProduct = await product.save()
        res.send({
            message: 'Product Created',
            product: createdProduct,
        })
    })
)

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        const product = await ProductModel.findById(req.params.id)
        if (product) {
            const deleteProduct = await product.deleteOne()
            res.send({ message: 'Product Deleted', product: deleteProduct })
        } else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    })
)

