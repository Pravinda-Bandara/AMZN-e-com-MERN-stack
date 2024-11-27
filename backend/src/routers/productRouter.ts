import express,{Request,Response} from "express";
import asyncHandler from 'express-async-handler'
import {Product, ProductModel} from "../models/productModel.js";
import {isAdmin, isAuth} from "../utils.js";

export const productRouter = express.Router()
// /api/products
productRouter.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const {
            page = 1,
            pageSize = 10,
            category = '',
            brand = '',
            searchQuery = '',
            sort = '',
        } = req.query;

        const pageNumber = Number(page);
        const limit = Number(pageSize);
        const skip = limit * (pageNumber - 1);

        const query: any = {};
        if (category) query.category = category;
        if (brand) {
            const brandsArray = brand.split(',');
            query.brand = { $in: brandsArray }; // Logical OR for multiple brands
        }
        if (searchQuery) {
            query.$or = [
                { name: { $regex: searchQuery, $options: 'i' } }, // Search in name
                { brand: { $regex: searchQuery, $options: 'i' } }, // Search in brand
                { category: { $regex: searchQuery, $options: 'i' } }, // Search in category
            ];
        }

        let sortOrder = {};
        if (sort) {
            switch (sort) {
                case 'lowest':
                    sortOrder = { price: 1 };
                    break;
                case 'highest':
                    sortOrder = { price: -1 };
                    break;
                case 'toprated':
                    sortOrder = { rating: -1 };
                    break;
                case 'newest':
                    sortOrder = { createdAt: -1 };
                    break;
                default:
                    sortOrder = {};
            }
        }

        const products = await ProductModel.find(query)
            .sort(sortOrder)
            .skip(skip)
            .limit(limit);

        const countProducts = await ProductModel.countDocuments(query);

        res.send({
            products,
            countProducts,
            page: pageNumber,
            pages: Math.ceil(countProducts / limit),
        });
    })
);

productRouter.get(
    '/categories',
    asyncHandler(async (req: Request, res: Response) => {
        // No need for the brand filter anymore
        const categories = await ProductModel.find().distinct('category');
        res.json(categories);
    })
);


productRouter.get(
    '/brands',
    asyncHandler(async (req: Request, res: Response) => {
        const category = req.query.category || ''; // Optional query param
        const match: Record<string, unknown> = {};
        if (category) match.category = category;

        const brands = await ProductModel.find(match).distinct('brand');
        res.json(brands);
    })
);




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
        const pageSize = Number(query.pageSize) || 8

        const products = await ProductModel.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize)
        const countProducts = await ProductModel.countDocuments()
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
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

