import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../../../../components/Rating";
import { Product } from "../../../../types/Product";

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <Card className="h-full border-0 m-0 p-0">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Product Image */}
                <div className="flex w-full md:w-1/2 justify-center h-auto item-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain max-h-[400px] rounded"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-3">{product.name}</h2>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    <p className="mt-4 text-lg">
                        <strong>Price: </strong>${product.price}
                    </p>
                    <p className="mt-2 text-lg">
                        <strong>Brand: </strong>{product.brand}
                    </p>
                    <p className="mt-2">
                        <strong>Description: </strong>{product.description}
                    </p>
                </div>
            </div>
        </Card>
    );
}
