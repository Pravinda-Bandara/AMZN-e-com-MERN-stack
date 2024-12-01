import React from "react";
import { Link } from "react-router-dom";

interface OrderItemsProps {
    cartItems: {
        _id: string;
        name: string;
        image: string;
        slug: string;
        quantity: number;
        price: number;
    }[];
}

export function OrderItems({ cartItems }: OrderItemsProps) {
    return (
        <div className="mb-4 p-6 bg-white rounded-lg border-1">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Items</h2>
                <Link
                    to="/cart"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                    Edit
                </Link>
            </div>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <Link
                                to={`/product/${item.slug}`}
                                className="text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        </div>
                        {/* Quantity and Price Section */}
                        <div className="flex space-x-8 w-60 justify-between">
                            {/* Quantity Section */}
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-semibold text-gray-700">Quantity:</div>
                                <div className="text-sm font-semibold text-gray-700">{item.quantity}</div>
                            </div>
                            {/* Price Section */}
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-semibold text-gray-700">Price:</div>
                                <div className="text-sm font-semibold text-gray-700">${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
