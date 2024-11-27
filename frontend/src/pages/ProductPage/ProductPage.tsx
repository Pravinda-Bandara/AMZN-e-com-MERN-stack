import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../../hooks/productHooks.ts";
import { toast } from "react-toastify";
import { Store } from "../../Store.tsx";
import { convertProductToCartItem, getError } from "../../util.ts";
import { ProductDetails } from "./components/ProductDetails.tsx";
import { ProductActions } from "./components/ProductAction.tsx";

import { ApiError } from "../../types/ApiError.ts";
import LoadingBox from "../../components/LoadingBox.tsx";
import MessageBox from "../../components/MessageBox.tsx";

function ProductPage() {
    const params = useParams();
    const { slug } = params;

    // Fetch product data by slug
    const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);

    // Context to access the cart state
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    const navigate = useNavigate();

    // Add product to cart handler
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product!._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        // Check if the quantity exceeds stock
        if (product!.countInStock < quantity) {
            toast.warn('Sorry. Product is out of stock', {
                autoClose: 1000,
            });
            return;
        }

        // Dispatch action to add the item to the cart
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...convertProductToCartItem(product!), quantity },
        });

        toast.success('Product added to the cart', {
            autoClose: 1000,
        });

        // Navigate to the cart page
        navigate('/cart');
    };

    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
    ) : !product ? (
        <MessageBox variant="danger">Product Not Found</MessageBox>
    ) : (
        <div>
            <div className="row">
                {/* Product details section */}
                <ProductDetails product={product} />

                {/* Product actions section */}
                <ProductActions product={product} addToCartHandler={addToCartHandler} />
            </div>
        </div>
    );
}

export default ProductPage;
