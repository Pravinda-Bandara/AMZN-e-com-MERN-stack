import React from "react";
import { Card, Button } from "react-bootstrap";
import Rating from "../../../../components/Rating";
import { Product } from "../../../../types/Product";

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    /* const productImage = `../${product.image}`; */
    return (
        <Card className="shadow-0 border-0">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Product Image */}
                <div className="flex w-full md:w-1/2 justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain max-h-[400px] rounded"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
                    <Rating rating={product.rating} numReviews={product.numReviews} />

                    <div className="mt-4">
                        <p className="text-lg">
                            <strong>Price:</strong> ${product.price}
                        </p>
                        <p className="text-lg">
                            <strong>Category:</strong> {product.category}
                        </p>
                        <p className="text-lg">
                            <strong>Brand:</strong> {product.brand}
                        </p>
                        <p className="text-lg">
                            <strong>In Stock Virtual:</strong> {product.virtualCountInStock > 0
                                ? `${product.virtualCountInStock} items`
                                : "Out of Stock"}
                        </p>
                        <p className="text-lg">
                            <strong>In Stock:</strong> {product.realCountInStock > 0
                                ? `${product.realCountInStock} items`
                                : "Out of Stock"}
                        </p>
                        <p className="text-lg">
                            <strong>Description:</strong> {product.description}
                        </p>
                        {product.isFeatured && (
                            <p className="text-lg mt-2 text-success">
                                <strong>Featured:</strong> Yes
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
