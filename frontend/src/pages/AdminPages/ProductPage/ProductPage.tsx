import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../../../hooks/productHooks";
import { toast } from "react-toastify";
import { Store } from "../../../Store";
import { convertProductToCartItem, getError } from "../../../util";
import { ProductDetails } from "./components/ProductDetails";
import { ProductActions } from "./components/ProductAction";

import { ApiError } from "../../../types/ApiError";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";

function ProductPage() {
    const params = useParams();
    const { slug } = params;

    const { data: product, isLoading, error } = useGetProductDetailsBySlugQuery(slug!);

    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    const navigate = useNavigate();

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product!._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product!.virtualCountInStock < quantity) {
            toast.warn("Sorry, product is out of stock", { autoClose: 1000 });
            return;
        }

        dispatch({
            type: "CART_ADD_ITEM",
            payload: { ...convertProductToCartItem(product!), quantity },
        });

        toast.success("Product added to the cart", { autoClose: 1000 });
        navigate("/");
    };

    const handleEditProduct = () => {
        navigate(`/admin/product/edit/${product!._id}`);
    };

    const handleDeleteProduct = () => {
        // Confirm deletion
        if (window.confirm("Are you sure you want to delete this product?")) {
            // Call delete API (mocked here for now)
            toast.success("Product deleted successfully", { autoClose: 1000 });
            navigate("/admin/products");
        }
    };

    return (
        <div className="container border p-6 m-0">
            {isLoading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">
                    {getError(error as unknown as ApiError)}
                </MessageBox>
            ) : !product ? (
                <MessageBox variant="danger">Product Not Found</MessageBox>
            ) : (
                <div className="row gx-4 gy-3">
                    {/* Left Column: Product Details */}
                    <div className="col-lg-8">
                        <ProductDetails product={product} />
                    </div>

                    {/* Right Column: Product Actions */}
                    <div className="col-lg-4">
                        <ProductActions
                            product={product}
                            addToCartHandler={addToCartHandler}
                            handleEditProduct={handleEditProduct}
                            handleDeleteProduct={handleDeleteProduct}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductPage;
