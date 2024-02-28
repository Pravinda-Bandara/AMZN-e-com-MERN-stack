import express,{Request,Response} from "express";
import {isAdmin, isAuth} from "../utils.js";
import asyncHandler from "express-async-handler";
import {OrderModel} from "../models/orderModel.js";
import {Product} from "../models/productModel.js";
export const orderRouter=express.Router();

orderRouter.get(
    '/',
    isAuth,
    isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        const orders = await OrderModel.find().populate('user', 'name')
        res.send(orders)
    })
)
orderRouter.get(
    '/mine',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {

        const orders = await OrderModel.find({ user: req.body.user._id })
        res.send(orders)

    })
)

orderRouter.delete(
    '/:id',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const orderId = req.params.id;

            // Find the order by ID and delete it
            const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

            if (deletedOrder) {
                res.json({ message: 'Order deleted successfully', order: deletedOrder });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
    })
)

orderRouter.get(
    '/:id',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id)
        if (order) {
            res.json(order)
        } else {
            res.status(404).json({ message: 'Order Not Found' })
        }
    })
)

orderRouter.post(
    '/',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {

        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: 'Cart is empty' })
        } else {
            const createdOrder = await OrderModel.create({
                orderItems: req.body.orderItems.map((x: Product) => ({
                    ...x,
                    product: x._id,
                })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.body.user._id,
            })
            res
                .status(201)
                .send({ message: 'Order Not Found', order: createdOrder })
        }
    })
)

orderRouter.put(
    '/:id/pay',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id).populate('user')

        if (order) {
            order.isPaid = true
            order.paidAt = new Date(Date.now())

            const updatedOrder = await order.save()
            console.log(updatedOrder)
            res.send(updatedOrder)
        } else {
            res.status(404).send({ message: 'Order Not Found' })
        }
    })
)



/*
orderRouter.get(
    '/',
    isAuth,
    isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        const orders = await OrderModel.find().populate('user', 'name')
        res.send(orders)
    })
)

orderRouter.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id)
        if (order) {
            order.isDelivered = true
            order.deliveredAt = new Date(Date.now())
            // order.deliveredAt = Date.now();

            const updatedOrder = await order.save()
            res.send({ message: 'Order Delivered', order: updatedOrder })
        } else {
            res.status(404).send({ message: 'Order Not Found' })
        }
    })
)

orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id)
        if (order) {
            const deleteOrder = await order.deleteOne()
            res.send({ message: 'Order Deleted', order: deleteOrder })
        } else {
            res.status(404).send({ message: 'Order Not Found' })
        }
    })
)



*/


