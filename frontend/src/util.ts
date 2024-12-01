import {ApiError} from "./types/ApiError.ts";
import {CartItem} from "./types/CartItem.ts";
import {Product} from "./types/Product.ts";

export const getError = (error: ApiError) => {
    return error.response && error.response.data.message
        ? error.response.data.message
        : error.message
}

export const convertProductToCartItem = (product: Product): CartItem => {

    const cartItem: CartItem = {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        price: product.price,
        virtualCountInStock: product.virtualCountInStock,
        realCountInStock: product.realCountInStock,
        quantity: 1,
    }
    return cartItem
}