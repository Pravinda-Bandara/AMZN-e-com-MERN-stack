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
            minPrice = 0,   // New parameter for minimum price
            maxPrice = Infinity, // New parameter for maximum price
        } = req.query;

        const pageNumber = Number(page);
        const limit = Number(pageSize);
        const skip = limit * (pageNumber - 1);

        const query: any = {};
        if (category) query.category = category;
        if (brand) {
            if (typeof brand === 'string') {
                const brandsArray = brand.split(',');
                query.brand = { $in: brandsArray }; // Logical OR for multiple brands
            }
        }
        if (searchQuery) {
            query.$or = [
                { name: { $regex: searchQuery, $options: 'i' } }, // Search in name
                { brand: { $regex: searchQuery, $options: 'i' } }, // Search in brand
                { category: { $regex: searchQuery, $options: 'i' } }, // Search in category
            ];
        }
        // Adding price range filters
        if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
        if (maxPrice !== Infinity) query.price = { ...query.price, $lte: Number(maxPrice) };

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
      // Extract category, searchQuery, minPrice, and maxPrice from request query parameters
      const { category = '', searchQuery = '', minPrice = 0, maxPrice = Infinity }: { category?: string; searchQuery?: string; minPrice?: number; maxPrice?: number } = req.query;
  
      try {
        // Build the filter criteria
        const filterCriteria: any = {};
  
        // Case-insensitive search for category
        if (category && typeof category === 'string') {
          filterCriteria.category = { $regex: new RegExp(category, 'i') };
        }
  
        // Search for searchQuery in name or category (partially matching)
        if (searchQuery && typeof searchQuery === 'string') {
          filterCriteria.$or = [
            { name: { $regex: new RegExp(searchQuery, 'i') } },
            { category: { $regex: new RegExp(searchQuery, 'i') } },
          ];
        }
  
        // Adding price range filter
        if (minPrice && maxPrice !== Infinity) {
          filterCriteria.price = { $gte: minPrice, $lte: maxPrice };
        }
  
        // Fetch products matching the criteria
        const products = await ProductModel.find(filterCriteria)
          .select('brand')
          .distinct('brand')
          .exec();
  
        // Return the unique brands
        res.json(products);
      } catch (error) {
        // Catch and handle any errors
        res.status(500).json({
          message: 'Error fetching brands',
          error: (error as Error).message,
        });
      }
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

